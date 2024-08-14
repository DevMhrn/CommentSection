import React, { useEffect } from "react";
import { useComment } from "./useComment";
import "./comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";


function Comment() {
  const {
    messages,
    editingIndex,
    replyingTo,
    handlePost,
    handleEdit,
    handleReply,
    handleDelete,
    toggleSortOrder,
    sortAscending,
  } = useComment();

  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  const onSubmit = (data, parentIndex) => {
    const { name, comment } = data;

    
    if (!name || !comment) {
      alert("Please fill in both the name and message fields.");
      return;
    }

    handlePost(name, comment, parentIndex);
    reset();
  };

  useEffect(() => {
    if (editingIndex !== null) {
      const message = findMessageByIndex(editingIndex, messages);
      if (message) {
        setValue("name", message.name);
        setValue("comment", message.comment);
      }
    }
  }, [editingIndex, messages, setValue]);

  const findMessageByIndex = (index, messages) => {
    const path = index.split("-");
    let message = messages;

    for (let i = 0; i < path.length; i++) {
      message = message[path[i]];
      if (i < path.length - 1) {
        message = message.replies;
      }
    }

    return message;
  };

  const renderMessages = (messages, parentIndex = "") =>
    messages.map((message, index) => {
      const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;

      return (
        <div key={currentIndex} className="message">
          {editingIndex === currentIndex ? (
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, parentIndex))}
              className="edit-box"
            >
              <input
                {...register("name")}
                placeholder="Your name"
                disabled
              />
              <textarea
                {...register("comment")}
                placeholder="Edit your message..."
              />
              <button type="submit">Update</button>
            </form>
          ) : (
            <>
              <div className="message-header">
                <div className="person">
                  <strong>{message.name} </strong>
                  <p>{message.comment}</p>
                </div>
                <span className="timestamp">{message.timestamp}</span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(currentIndex)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
              
              <div className="event-button">
                <button onClick={() => handleEdit(currentIndex)}>Edit</button>
                <button onClick={() => handleReply(currentIndex)}>Reply</button>
              </div>
            </>
          )}

          {replyingTo === currentIndex && (
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, currentIndex))}
              className="reply-box"
            >
              <input
                {...register("name")}
                placeholder="Your name"
              />
              <textarea
                {...register("comment")}
                placeholder="Your reply..."
              />
              <button type="submit">Post Reply</button>
            </form>
          )}

          <div className="replies">
            {message.replies.length > 0 &&
              renderMessages(message.replies, currentIndex)}
          </div>
        </div>
      );
    });

  return (
    <div className="comment">
      <h3 className="title">Comment</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data, null))}>
        <input {...register("name")} placeholder="Your name" />
        <textarea {...register("comment")} placeholder="Write your message..." />
        <div className="post-sort">
          <button type="submit">Post</button>
          <button type="button" onClick={toggleSortOrder}>
            Sort by Date and Time: {sortAscending ? "Oldest First" : "Newest First"}
          </button>
        </div>
      </form>
      <div className="messages">{renderMessages(messages)}</div>
    </div>
  );
}

export default Comment;
