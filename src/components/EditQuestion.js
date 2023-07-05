import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditQuestion = () => {
  const [question, setQuestion] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    // let userName = localStorage.getItem("userName");
    axios.defaults.headers.common["userToken"] = userToken;

    if (!userToken) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:2390/question/${id}`)
        .then((res) => {
          // console.log(res.data)
          const { question, desc } = res.data.question;
          setQuestion(question);
          setDesc(desc);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, id]);

  const onSubmitEdit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2390/update-question/${id}`, { question, desc })
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
      <p>Logged user: {localStorage.getItem("userName")}</p>
      <h2>Welcome to Matrix Master Community</h2>
      <a href="/">
        <button className="btn btn-secondary">Home</button>
      </a>

      <p>Edit Question:</p>

      <form onSubmit={onSubmitEdit} className="addQuestion">
        <div className="mb-3">
          <label htmlFor="edit-question" className="form-label">
            Question
          </label>
          <input
            type="text"
            name="question"
            className="form-control"
            id="edit-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="desc"
            id="exampleFormControlTextarea1"
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
