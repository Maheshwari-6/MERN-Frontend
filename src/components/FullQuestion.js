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
      {userName && <p>Logged user: {userName}</p>}
      <div>
        <a href="/">
          <button class="btn btn-warning btn-home" id="back-to-home">
            Home
          </button>
        </a>
      </div>

      {question ? (
        <div>
          <h1>{question.question}</h1>
          <h2>{question.desc}</h2>
          <h2>Posted by: {question.userId.userName}</h2>
          <h2>{question.formattedDate}</h2>
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
            
            {question.comments.map((comment) => (
              <div class="comment-list-container">
                <h3>All the comments:</h3>
                <div class="text">
                  <h3>
                    <span>{comment.text}</span>
                  </h3>
                  <p>Added at: {comment.createdAt}</p>
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
