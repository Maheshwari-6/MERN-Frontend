import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[users, setUsers] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:2390/")
      .then( result => {
        console.log(result)
        setUsers(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="App">
      { users.length > 0 ?
        users.map(user => {
          return(
            <div key={user._id}>

              <h2>{user.desc}</h2>
              <h3>{user.question}</h3>
            </div>        
          )
        }):null
        } 
    </div>
  );
}

export default App;
