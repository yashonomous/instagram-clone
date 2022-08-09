import { Button, FormControl, Input, TextField } from "@material-ui/core";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import db from "../common/firebase";
import "../css/Login.css";

const Login = ({ setLoggedInUser }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setLoggedInUser("");

    setCookie("username", "", { path: "/" });

    const usersQuery = query(collection(db, "users"));

    onSnapshot(usersQuery, (snapShot) => {
      setUsers(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleSignup = (event) => {
    navigate("/signup");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let loggedIn = false;
    let userFound = false;
    users.forEach((user) => {
      if (user.username === username) {
        userFound = true;
        if (user.password !== password) {
          console.log("password doesnt match");
          return;
        }
        console.log("logged in ");
        loggedIn = true;
        setLoggedInUser(username);
        setCookie("username", username, { path: "/" });
        navigate("/home");
        return;
      }
    });

    if (!userFound && !loggedIn) {
      console.log("user not found in db");
      return;
    }
  };

  return (
    <div className="login__container">
      <div className="login__logoContainer">
        <img
          className="login__logoImage"
          src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
          alt="ig logo"
        />
      </div>
      <div className="login__formContainer">
        <form className="login__form">
          <FormControl className="login__formControl">
            <TextField
        
              type="text"
              label="username"
              variant="filled"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value);
              }}
              InputProps={{ disableUnderline: true }}
            />
          </FormControl>

          <FormControl className="login__formControl">
            <TextField
              type="password"
              label="password"
              variant="filled"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              InputProps={{ disableUnderline: true }}
            />
          </FormControl>

          <FormControl className="login__formControl">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!username || !password}
              onClick={handleLogin}
            >
              Log in
            </Button>
          </FormControl>
        </form>
      </div>
      <div className="login__signUpContainer">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
