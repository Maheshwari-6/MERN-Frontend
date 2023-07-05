import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [question, setQuestion] = useState([]);
  const [desc, setDesc] = useState([]);
  let userToken = localStorage.getItem("userToken");
  let userName = localStorage.getItem("userName");
  axios.defaults.headers.common["userToken"] = userToken;

  const navigate = useNavigate();

  if (!userToken) {
    navigate("/");
  }

  const onSubmitQuestion = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2390/postQuestion", { question, desc })
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

  return (
    <div>
      {userName && <p>Logged user: {userName}</p>}

      <a href="/">
        <button class="btn btn-secondary">Home</button>
      </a>

      <h2>Add Question</h2>

      <form onSubmit={(e) => onSubmitQuestion(e)} class="addQuestion">
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
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
