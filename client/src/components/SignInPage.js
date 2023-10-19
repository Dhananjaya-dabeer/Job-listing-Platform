import react, { useState } from "react";
import registerimg from "../images/registerimg.png";
import axios from "axios";
import "./signInPage.css";
import { Link } from "react-router-dom";

function SignInPage() {
  const [response, setResponse] = useState("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const SignInHandler = (event) => {
    event.preventDefault();
    if (!user.Email || !user.Password) {
      return setResponse("All fields are required!");
    }
    axios
      .post("http://localhost:4000/SignIn", user)
      .then((res) => {
        setResponse(res.data.message);
        setUser({
          Email: "",
          Password: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
        setResponse(err.response.data.message);
      });
  };
  return (
    <div className="signin">
      <form onSubmit={SignInHandler}>
        <div className="alreadyhaveaccount">
          <h1>Already have an account?</h1>
          <p>Your personal job finder is here</p>
          <p className={response ? "response-msg" : ''}>{response}</p>
        </div>
        <div className="inputholder">
          <div className="emailholder">
            <input
              id="emailholder"
              type="email"
              name="Email"
              autoComplete="off"
              placeholder="Email"
              value={user.Email}
              onChange={(e) => setUser({ ...user, Email: e.target.value })}
            />
          </div>
          <div className="passwordholder">
            <input
              id="passwordholder"
              type="password"
              name="Password"
              autoComplete="off"
              placeholder="Password"
              value={user.Password}
              onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />
          </div>
        </div>
        <div className="signin-butn">
          <button type="submit">Sign in</button>
          <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>
        </div>
      </form>
      <div className="imgcontainer">
        <p>Your Personal Job Finder</p>
        <img src={registerimg} alt="" />
      </div>
    </div>
  );
}

export default SignInPage;
