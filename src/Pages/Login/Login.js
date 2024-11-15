import React, { useEffect, useState } from "react";
import logo from "../../assets/images/trigger-logo.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IconButton } from "rsuite";
import { FaFacebookF } from "react-icons/fa6";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, database } from "../../Firebase/firebase";
import { onValue, ref } from "firebase/database";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      if (response) {
        console.log("Google signIn:", response.user);
        console.log("Name:", response.user.displayName);
        console.log("Email:", response.user.email);
        console.log("time:", new Date().toLocaleString());
        console.log("photo url:", response.user.photoURL);
        console.log("Phone number:", response.user.phoneNumber);
        console.log("uid:", response.user.uid);
        console.log("meta time:", response.user.metadata.creationTime);
        console.log("meta time1:", response.user.metadata.lastSignInTime);
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const facebookSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, new FacebookAuthProvider());
      if (response) {
        console.log("Facebook signIn:", response);
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const loginRegistered = (e) => {
    e.preventDefault();
    const usersArray = Object.entries(registeredUsers);
    for (let index = 0; index < usersArray.length; index++) {
      if (
        usersArray[index][1].Email === String(userName) &&
        usersArray[index][1].Password === String(password)
      ) {
        const loggedInUser = usersArray[index];
        loggedInUser[1].loggedInStatus = true;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        alert("registered");
        navigate("/");
        break;
      }
    }
  };

  useEffect(() => {
    const registeredUsersRef = ref(database, "/registered");
    onValue(registeredUsersRef, (snap) => {
      console.log("registered users snap value:", snap.val());
      setRegisteredUsers(snap.val());
    });
  }, []);

  console.log("Registered users entries:", Object.entries(registeredUsers));

  return (
    <div className="login-content">
      <div className="login-design">
        <img src={logo} alt="Trigger Logo" title="Trigger" width={300} />
        <div className="login-field">
          <h1>Trigger now...</h1>
          <form onSubmit={loginRegistered}>
            <input
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <br />
            <div className="signin-buttons">
              <IconButton
                icon={<FaGoogle />}
                className="google-button"
                onClick={googleSignIn}
              />
              <IconButton
                icon={<FaFacebookF />}
                className="facebook-button"
                onClick={facebookSignIn}
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <center>
          <pre className="signup-link">
            Don't have an account?<Link to="/signup">SignUp</Link>
          </pre>
        </center>
      </div>
    </div>
  );
};

export default Login;
