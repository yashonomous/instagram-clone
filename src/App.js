import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
      </Routes>
    </div>
  );
}

export default App;
