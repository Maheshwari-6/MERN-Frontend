import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [signedUp, setSignedUp] = useState("");
  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setError("");
    setSignupError("");
    axios
      .post("http://localhost:2390/login", { email, password })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("userToken", res.data.userToken);
          localStorage.setItem("userName", res.data.username);
          localStorage.setItem("userId", res.data.userId);
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };

  const onSubmitSignup = (e) => {
    e.preventDefault();
    setError("");
    setSignupError("");
    axios
      .post("http://localhost:2390/new-account", {
        userName,
        email: signupEmail,
        password: signupPassword,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setSignupEmail("");
          setSignupPassword("");
          setUserName("");
          setSignedUp("true");
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupError(err.response.data);
      });
  };

  return (
    <div>
      <a href="/">
        <button class="btn btn-secondary">Home</button>
      </a>

      <h2>Welcome to Matrix Master Community</h2>

      {signedUp === "true" && <h3>Signed up</h3>}

      {error && <h3>Failed to login: {error}</h3>}

      {signupError && <h3>Failed to signup: {signupError}</h3>}

      <div id="log">
        <div>
          <h4>Login</h4>

          <form onSubmit={(e) => onSubmitLogin(e)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div>
          <h4>Sign Up</h4>

          <form onSubmit={(e) => onSubmitSignup(e)}>
            <div class="mb-3">
              <label for="exampleInputName" class="form-label">
                Name
              </label>
              <input
                type="text"
                name="userName"
                class="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
