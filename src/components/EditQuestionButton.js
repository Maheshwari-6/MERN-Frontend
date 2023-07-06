import React from 'react';

const EditQuestionButton = ({ question, userId }) => {
  

  if (userId && question.userId._id.toString() === userId.toString()) {
    return (
      <a href={`/question/edit/${question._id}`}>
        <button className="btn btn-success editbtn">Edit question</button>
      </a>
    );
  }

  return null;
}

export default EditQuestionButton;