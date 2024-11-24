import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Notifications from "./Pages/Notifications/Notifications";
import Music from "./Pages/Music/Music";
import Videos from "./Pages/Videos/VideoPlayer";
import TicTacToe from "./Pages/Games/TicTacToe/TicTacToe";
import CarGame from "./Pages/Games/CarGame/CarGame";
import Games from "./Pages/Games/Games";
import ChessGame from "./Pages/Games/Chess/ChessGame";
import TriggyBirdGame from "./Pages/Games/TriggyBird/TriggyBirdGame";
import Weather from "./Components/Sidebar/Weather";
import TriggyFrogGame from "./Pages/Games/TriggyFrog/TriggyFrogGame";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Weather />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/music" element={<Music />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/tictactoe" element={<TicTacToe />} />
            <Route path="/games/cargame" element={<CarGame />} />
            <Route path="/games/chess" element={<ChessGame />} />
            <Route path="/games/triggybird" element={<TriggyBirdGame />} />
            <Route path="/games/triggyfrog" element={<TriggyFrogGame />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
