import React from 'react';

const EditQuestionButton = ({ question, userId }) => {
  // Implement the logic for checking the user and question ownership

  if (userId && question.userId._id.toString() === userId.toString()) {
    return (
      <a href={`/question/edit/${question._id}`}>
        <button className="btn btn-success">Edit question</button>
      </a>
    );
  }

  return null;
}

export default EditQuestionButton;