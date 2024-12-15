import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Music from "./Components/Music/Music";
import Quiz from "./Components/Quiz/Quiz";
import Video from "./Components/Video/Video";
import Games from "./Components/Games/Games";
import CarGame from "./Components/Games/CarGame/CarGame";
import TicTacToe from "./Components/Games/TicTacToe/TicTacToe";
import ChessGame from "./Components/Games/Chess/ChessGame";
import TriggyBirdGame from "./Components/Games/Chess/TriggyBird/TriggyBirdGame";
import Updates from "./Components/Updates/Updates";
import About from "./Components/About/About";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/musicPlayer" element={<Music />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/videoPlayer" element={<Video />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/tictactoe" element={<TicTacToe />} />
        <Route path="/games/cargame" element={<CarGame />} />
        <Route path="/games/chess" element={<ChessGame />} />
        <Route path="/games/triggybird" element={<TriggyBirdGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
