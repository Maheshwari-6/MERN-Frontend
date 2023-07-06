import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AskChat = () => {
  const [question, setQuestion] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [chatGPTReply, setChatGPTReply] = useState("");
  let userToken = localStorage.getItem("userToken");
  let userName = localStorage.getItem("userName");
  axios.defaults.headers.common["userToken"] = userToken;

  const navigate = useNavigate();

  if (!userToken) {
    navigate("/");
  }

  const askChatGpt = (e) => {
    e.preventDefault();
    if (question && desc) {
      axios
        .post("http://localhost:2390/askChatGpt", { question, desc })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setChatGPTReply(res.data.chatGPTReply);
            setSubmitted(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createQuestion = (e, withChatGpt) => {
    e.preventDefault();
    console.log(withChatGpt)
    if(withChatGpt === false) {
        axios
        .post("http://localhost:2390/postQuestion", {
          question,
          desc,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });          
    } else {
        axios
        .post("http://localhost:2390/postQuestion", {
          question,
          desc,
          chatGPTReply,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });          

    }
  };

  return (
    <div>
      

      <a href="/">
        <button class="btn btn-secondary">Home</button>
      </a>
      {userName && <p className="userName">Hello: {userName}</p>}

      <h2>Add Question</h2>

      {!submitted && (
        <div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Question
            </label>
            <input
              type="text"
              name="question"
              class="form-control"
              id="exampleFormControlInput1"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              name="desc"
              id="exampleFormControlTextarea1"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={askChatGpt}
          >
            Ask ChatGPT
          </button>
        </div>
      )}

      {submitted && (
        <div>
          <h3><strong>Question:</strong> {question}</h3>
          <h3><strong>Description:</strong> {desc}</h3>
          <h3 style={{fontWeight:"normal", fontSize:"15px", marginBottom:"25px"}}><strong>ChatGPT answer:</strong> {chatGPTReply}</h3>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => createQuestion(e, true)}
          >
            Create with ChatGPT response
          </button>
          <button
            type="submit"
            className="btn btn-danger accept"
            onClick={(e) => createQuestion(e, false)}
          >
            Create without ChatGPT response
          </button>
        </div>
      )}
    </div>
  );
};

export default AskChat;
