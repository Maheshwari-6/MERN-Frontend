import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullQuestion = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    let userToken = localStorage.getItem("userToken");
    let userName = localStorage.getItem("userName");
    axios.defaults.headers.common["userToken"] = userToken;    

    useEffect(() => {
        axios
          .get(`http://localhost:2390/question/${id}`)
          .then((result) => {
            console.log(result.data);
            setQuestion(result.data.question)
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);

  return (
    <div>
      <div>
    <a href="/"><button class="btn btn-warning btn-home" id="back-to-home">Home</button></a>
    </div>

    {question ? (<div>
        <h1>{question.question}</h1>
        <h2>{question.desc}</h2>
        <h2>Posted by: {question.userId.userName}</h2>
        <h2>{question.formattedDate}</h2>
        {userName && <p>Logged user: {userName}</p>}

        
        {question.chatGPTReply && <div class="chat-gpt-response">
            
                <h3>Chat GPT Reply:</h3>
                <p>{question.chatGPTReply}</p>
                
         
        </div>
        }

        
        <div class="comment-list">
            <h1>Comments</h1>
            {question.comments.map(comment => (
            <div class="comment-list-container"> 
    
            <div class="text">
                <h3><span>{comment.text}</span></h3>
                <p>Added at: {comment.createdAt}</p>
                <p class="des">Posted by: {comment.userId.userName}</p>
                        
            </div>
        </div>
            
            ))}           
    
        </div>

       
    </div>) : (<p>Loading...</p>)}
    </div>
  )
}

export default FullQuestion