import react, { useEffect, useState,useContext } from "react";
import registerimg from "../images/registerimg.png";
import axios from "axios";
import "./signInPage.css";
import { Link, useNavigate } from "react-router-dom";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";


function SignInPage() {
  const [response, setResponse] = useState("");

  const navigate = useNavigate()
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  useEffect(()=>{
    const userLoggedIn = !!getItemFromLocalStorage('user-token') 
    console.log('navigating')
    userLoggedIn && navigate('/homepage')
  }, [])

  const SignInHandler = (event) => {
    event.preventDefault();
    if (!user.Email || !user.Password) {
      return setResponse("All fields are required!");
    }
    axios
      .post("https://job-listing-platform-gtms.onrender.com/SignIn", user)
      .then((res) => {
        let response = res.data.message || {}
          setResponse(response);
          setItemToLocalStorage('userName',response)
          setItemToLocalStorage('user-token', res.data.token)
          setUser({
            Email: "",
            Password: "",
          });
          
          if(res.data.token) navigate('/homepage')
        
    
        })
      .catch((err) => {
        // console.log(err.response.data.message);
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
