import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditQuestionButton from "./EditQuestionButton";
import DeleteQuestionButton from "./DeleteQuestionButton";
import DeleteCommentButton from "./DeleteCommentButton";

const FullQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [comment, setCommment] = useState("");
  let userToken = localStorage.getItem("userToken");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  axios.defaults.headers.common["userToken"] = userToken;

  const navigate = useNavigate();

  const onDelete = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2390/delete-question/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteComment = (e, commentId) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2390/question/${id}/delete-comment/${commentId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setQuestion(res.data.question);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const onSubmitComment = (e) => {
    e.preventDefault();
    axios
    .post(`http://localhost:2390/question/${id}/comment`, {text: comment})
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        setQuestion(res.data.question);
        setCommment("")
      }
    })

  }

  useEffect(() => {
    axios
      .get(`http://localhost:2390/question/${id}`)
      .then((result) => {
        console.log(result.data);
        setQuestion(result.data.question);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      
      <div>
        <a href="/">
          <button class="btn btn-warning btn-home" id="back-to-home">
            Home
          </button>
        </a>
      </div>
      {userName && <p className="userName">Hello: {userName}</p>}
      {question ? (
        <div className="contaner">
          <h4 className="ques" style={{ fontSize:"20px"}}><strong>Question:</strong>{question.question}</h4>

          <h4 className="ques" style={{ fontSize:"20px" }}><strong>Description:</strong>{question.desc}</h4>
          
          <h6>Posted by: {question.userId.userName}</h6>
          <h6>Date:{question.formattedDate}</h6>
          <EditQuestionButton question={question} userId={userId} />
          <DeleteQuestionButton
            question={question}
            userId={userId}
            onSubmitDelete={onDelete}
          />

          {question.chatGPTReply && (
            <div class="chat-gpt-response">
              <h3>Chat GPT Reply:</h3>
              <p>{question.chatGPTReply}</p>
            </div>
          )}

          {userId && (
            <div>
              <form onSubmit={(e) => onSubmitComment(e)} class="addQuestion">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Make a comment
                  </label>
                  <input
                    type="text"
                    name="comment"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={comment}
                    onChange={(e) => setCommment(e.target.value)}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Comment
                </button>
              </form>
            </div>
          )}
          <div class="comment-list">
            {question.comments.length > 0 && <h3>All the comments:</h3>}
            {question.comments.map((comment) => (
              <div class="comment-list-container">
                <div class="text">
                  <h3>
                    <span style={{fontWeight:'normal'}}>{comment.text }</span>

                  </h3>
                  <p id="date">Added at: {comment.createdAt}</p>
                  <p class="des">Posted by: {comment.userId.userName}</p>
                  <DeleteCommentButton comment={comment} question={question} userId={userId} onSubmitDelete={onDeleteComment}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FullQuestion;
