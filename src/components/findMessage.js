export const findMessage = (messages, path) => {
    let message = messages;
    for (let i = 0; i < path.length; i++) {
      message = message[path[i]];
      if (i < path.length - 1) {
        message = message.replies;
      }
    }
    return message;
  };
  