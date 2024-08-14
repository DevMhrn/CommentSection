import { findMessage } from "./findMessage";

export const handleDelete = (index, messages, setMessages) => {
  const updatedMessages = [...messages];
  if (index.includes("-")) {
    const parentIndex = index.substring(0, index.lastIndexOf("-"));
    const messageIndex = parseInt(index.split("-").pop(), 10);
    const parentMessage = findMessage(updatedMessages, parentIndex.split("-"));
    parentMessage.replies.splice(messageIndex, 1);
  } else {
    updatedMessages.splice(parseInt(index, 10), 1);
  }
  setMessages(updatedMessages);
};

