import React from "react";

const DeleteQuestionButton = ({ question, userId, onSubmitDelete }) => {
  if (userId && question.userId._id.toString() === userId.toString()) {
    return (
      <form onSubmit={(e) => onSubmitDelete(e)}>
        <button class="btn btn-danger ">Delete</button>
      </form>
    );
  }

  return null;
};

export default DeleteQuestionButton;
