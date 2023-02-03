import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  return (
    <div className={isDarkModeOn ? "app dark" : "app"}>
      <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Home
              loggedInUser={loggedInUser}
              setIsDarkModeOn={setIsDarkModeOn}
              isDarkModeOn={isDarkModeOn}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
