import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./SignUpPage.css";
import registerimg from "../images/registerimg.png";
import { Link } from "react-router-dom";

function SignUpPage() {
  // const [users, setUsers] = useState([]);
  const [jwtToken, setJwtToken] = useState("");
  const [checkBox, setCheckBox] = useState(false)
  const [response,setresponse] = useState('')
  const [newUser, setNewUser] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Password: "",
  });



  useEffect(() => {
    if (jwtToken) {
      axios
        .get(`http://localhost:4000/users`, {
          headers: {
            Authorization: `${jwtToken}`,
          },
        })
        .then((res) => console.log(res.data.data))
        .catch((err) => console.log(err.message));
    }
  }, [jwtToken]);

  const signupHandler = (event) => {
    event.preventDefault();

    if (
      !newUser.Name ||
      !newUser.Email ||
      !newUser.Mobile ||
      !newUser.Password ||
      !checkBox
    ) {
      setresponse("All fieds are required!");
      return;
    }

    axios
      .post(`http://localhost:4000/SignUp`, newUser)
      .then((res) => {
        setJwtToken(res.data.token);
        setresponse(res.data.message)
        // console.log(jwtToken);
        //
        setNewUser({
          Name: "",
          Email: "",
          Mobile: "",
          Password: "",
        });
      })
      .catch((err) =>{
        setresponse(err.response.data.message)
      });
  };
 

  return (
    <div className="signup">
      <div className="leftcomp">
        <div className="createaccount">
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
        </div>
        <div className= {response ? "error-msg" : ''}>
          <p>{response}</p>
        </div>
        <form onSubmit={signupHandler} className="inputfields">
          <div className="name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              value={newUser.Name}
              onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
            />
          </div>
          <div className="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={newUser.Email}
              onChange={(e) =>
                setNewUser({ ...newUser, Email: e.target.value })
              }
            />
          </div>
          <div className="number">
            <input
              type="Number"
              id="mobile"
              name="mobile"
              placeholder="Mobile"
              autoComplete="off"
              value={newUser.Mobile}
              onChange={(e) =>
                setNewUser({ ...newUser, Mobile: e.target.value })
              }
            />
          </div>
          <div className="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={newUser.Password}
              onChange={(e) =>
                setNewUser({ ...newUser, Password: e.target.value })
              }
            />
          </div>
          <div className="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox"  onChange= { () => setCheckBox(!checkBox)}/>
            <p>
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
            
          </div>
          <div className="register-butn">
            <button type="submit">Create Account</button>
          </div>
        </form>
        <div>
       
          
          <div className="routetosignin">
            <p>Already have an account? <Link to={'/signin'}>Sign In</Link></p>
          </div>
        </div>
      </div>
      <div className="registerimg">
        <p>Your Personal Job Finder</p>
        <img src={registerimg} alt="" />
      </div>
    </div>
  );
}

export default SignUpPage;
