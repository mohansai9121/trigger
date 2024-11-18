import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Notifications from "./Pages/Notifications/Notifications";
import Music from "./Pages/Music/Music";
import Videos from "./Pages/Videos/VideoPlayer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/music" element={<Music />} />
            <Route path="/videos" element={<Videos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
