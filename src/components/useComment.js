import { useState, useEffect } from "react";
import { handlePost } from "./handlePost";
import { handleDelete } from "./handleDelete";

export const useComment = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem("comments");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [sortAscending, setSortAscending] = useState(true);
    
    useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(messages));
    }, [messages]);

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const sortedMessages = messages.sort((a, b) => {
    return sortAscending ? a.timestampValue - b.timestampValue : b.timestampValue - a.timestampValue;
  });

  return {
    messages: sortedMessages,
    editingIndex,
    replyingTo,
    handlePost: (name, comment, parentIndex) =>
      handlePost(name, comment, parentIndex, messages, setMessages, editingIndex, setEditingIndex, setReplyingTo),
    handleDelete: (index) =>
      handleDelete(index, messages, setMessages),
    handleEdit: (index) => {
      setEditingIndex(index);
      setReplyingTo(null);
    },
    handleReply: (index) => {
      setReplyingTo(index);
      setEditingIndex(null);
    },
    toggleSortOrder,
    sortAscending,
  };
};
