import React, { useState } from "react";
import { FormControl, TextField, Button, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import "../css/Login.css";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../common/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    const signUpDoc = doc(collection(db, "users"));

    setDoc(signUpDoc, {
      email,
      fullname,
      username,
      password,
    })
      .then(() => {
        console.log("signed up");
        setOpenToast(true);
        setEmail("");
        setFullname("");
        setUsername("");
        setPassword("");
      })
      .catch(() => {
        console.log("failed signing up");
      });
  };

  return (
    <>
      <div className="singup__toast">
        {openToast && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenToast(false);
                  navigate("/");
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Signed Up Successfully!!
          </Alert>
        )}
      </div>
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
                className="login__usernameTextField"
                type="email"
                label="email"
                variant="filled"
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                InputProps={{ disableUnderline: true }}
              />
            </FormControl>

            <FormControl className="login__formControl">
              <TextField
                className="login__usernameTextField"
                type="text"
                label="full name"
                variant="filled"
                value={fullname}
                onChange={({ target }) => {
                  setFullname(target.value);
                }}
                InputProps={{ disableUnderline: true }}
              />
            </FormControl>

            <FormControl className="login__formControl">
              <TextField
                className="login__usernameTextField"
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
                disabled={!email || !fullname || !username || !password}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
