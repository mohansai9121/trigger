import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import { database } from "../../Firebase/firebase";

const SignUp = () => {
  const now = new Date().toLocaleDateString();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bday, setBday] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const RegisterToDB = async (e) => {
    e.preventDefault();
    try {
      if (fName && lName && bday && mobile && email && password1) {
        if (password1 === password2) {
          setPasswordMatch(true);
        } else {
          setPasswordMatch(false);
        }
        if (password1 === password2) {
          setIsLoading(true);
          const user = {
            Name: fName + " " + lName,
            Birthday: bday,
            Mobile: mobile,
            Email: email,
            Password: password1,
          };
          const dbRef = await push(ref(database, "/registered"));
          set(dbRef, user);
          console.log("Registered user:", user);
          setIsLoading(false);
          setPasswordMatch(null);
          alert("data posted");
        }
      } else {
        alert("Enter all the required input fields");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <div>
      <center>
        <form className="signup-form" onSubmit={RegisterToDB}>
          <div>
            <label>First Name:</label>{" "}
            <input
              type="text"
              placeholder="First Name..."
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name:</label>{" "}
            <input
              type="text"
              placeholder="Last Name..."
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <div>
            <label>Birthday:</label>{" "}
            <input
              type="Date"
              max={now}
              min="1910-01-01"
              value={bday}
              onChange={(e) => setBday(e.target.value)}
            />
          </div>
          <div>
            <label>Mobile:</label>{" "}
            <input
              type="number"
              placeholder="Mobile..."
              min={2222222222}
              max={10000000000}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>{" "}
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>{" "}
            <input
              type="password"
              placeholder="password..."
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div>
            <label>Re-enter password:</label>{" "}
            <input
              type="text"
              placeholder="password..."
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          {passwordMatch === false && password1 !== password2 ? (
            <div>
              <p style={{ color: "red" }}>Passwords are not matching...</p>
            </div>
          ) : (
            <></>
          )}
          {passwordMatch === false && password1 === password2 ? (
            <div>
              <p style={{ color: "red" }}>Passwords matched...</p>
            </div>
          ) : (
            <></>
          )}
          <button type="submit">Register</button>
        </form>
        <div className="link-to-login">
          Already have an account ? <Link to="/login">Login</Link>
        </div>
      </center>
    </div>
  );
};

export default SignUp;
