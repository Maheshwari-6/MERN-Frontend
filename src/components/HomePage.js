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
    
      { userToken && 
         <nav class="bg-dark border-bottom border-bottom-dark navbar navbarhome addquestion" data-bs-theme="dark">
          <div className="">
            <div className="logonav">
            <h3>Welcome To Matrix Master Community</h3>
            </div>
            
          <a href="/addQuestion">
            <button class="btn btn-light " id="gap">Add Question</button>
          </a>
          <a href="/addQuestionChat">
            <button class="btn btn-light" id="gap">Add Question Chat</button>
          </a>
          <a>
          <button onClick={handleLogout} type="button" className="btn btn-primary logoutbtn" id="gap1">Logout</button>
          </a>

        </div>
        </nav>
        }

      {!userName ? <a href="/login"><button class="btn btn-warning">Login</button></a> : null }
         
      {userName && <p className="userName">Hello : {userName}</p>}

      {questions.length > 0
        ? questions.map((user) => {
            return (
              <div class="box">
              <div key={user._id} id="star">
                <h2 class="weight">{user.question}</h2>
                <h3 class="weight" id="que">{user.desc.slice(0, 50)}</h3>
                <p>Created at: {user.createdAt}</p>
                <a className="seemore" href={`/question/${user._id}`} >See more...</a>
              </div>
              </div>
            );
          })
        : null}
        
    </div>
  );
};

export default HomePage;
