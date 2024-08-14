import { findMessage } from "./findMessage";

export const handlePost = (
  name,
  comment,
  parentIndex,
  messages,
  setMessages,
  editingIndex,
  setEditingIndex,
  setReplyingTo
) => {
  const newMessage = {
    name,
    comment,
    timestamp: new Date().toLocaleString(),
    timestampValue: new Date().getTime(),
    replies: [],
  };

  const updatedMessages = [...messages];

  if (parentIndex === null) {
    if (editingIndex !== null) {
      const messageToUpdate = findMessage(
        updatedMessages,
        editingIndex.split("-")
      );
      messageToUpdate.name = name;
      messageToUpdate.comment = comment;
      setEditingIndex(null);
    } else {
      updatedMessages.push(newMessage);
    }
  } else {
    if (editingIndex !== null) {
      const messageToUpdate = findMessage(
        updatedMessages,
        editingIndex.split("-")
      );
      messageToUpdate.name = name;
      messageToUpdate.comment = comment;
      setEditingIndex(null);
    } else {
      const parentMessage = findMessage(
        updatedMessages,
        parentIndex.split("-")
      );
      parentMessage.replies.push(newMessage);
    }
  }

  setMessages(updatedMessages);
  setReplyingTo(null);
};


