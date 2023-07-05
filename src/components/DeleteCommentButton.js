import React from "react";

const DeleteCommentButton = ({ question, userId, comment, onSubmitDelete }) => {
    console.log(comment)
  if (userId && (question.userId._id.toString() === userId.toString() || comment.userId._id.toString() === userId.toString())) {
    return (
      <form onSubmit={(e) => onSubmitDelete(e, comment._id)}>
        <button class="btn btn-danger ">Delete</button>
      </form>
    );
  }

  return null;
};

export default DeleteCommentButton;
