import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  let userToken = localStorage.getItem("userToken");
  let userName = localStorage.getItem("userName");
  axios.defaults.headers.common["userToken"] = userToken;
  
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:2390/")
      .then((result) => {
        console.log(result);
        setQuestions(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      {!userName ? <a href="/login"><button class="btn btn-warning">Login</button></a> : null }

      {userName && <p>Logged user: {userName}</p>}

      { userToken && 
        <div>
          <a href="/addQuestion">
            <button class="btn btn-success">Add Question</button>
          </a>
          <a href="/addQuestionChat">
            <button class="btn btn-success">Add Question Chat</button>
          </a>
          <a>
          <button onClick={handleLogout} type="button" className="btn btn-primary">Logout</button>
          </a>

        </div>
        
      }

      {questions.length > 0
        ? questions.map((user) => {
            return (
              <div key={user._id}>
                <h2>{user.question}</h2>
                <h3>{user.desc.slice(0, 50)}</h3>
                <p>Created at: {user.createdAt}</p>
                <a href={`/question/${user._id}`} >See more...</a>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default HomePage;
