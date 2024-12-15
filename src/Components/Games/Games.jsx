import "./Games.css";
import carGameImg from "../../assets/images/Games-images/cargame.png";
import chessImg from "../../assets/images/Games-images/chess.jpg";
import tictactoeImg from "../../assets/images/Games-images/tictactoe.png";
import triggyBirdImg from "../../assets/images/Games-images/triggybird.webp";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h2>Games</h2>
      <div className="games-container">
        <div className="game-card">
          <Link to="/games/cargame">
            <img src={carGameImg} alt="Car Game" className="game-image" />
            <h3>Car Game</h3>
          </Link>
          <Link to="/games/chess">
            <img src={chessImg} alt="Chess Game" className="game-image" />
            <h3>Chess Game</h3>
          </Link>
          <Link to="/games/tictactoe">
            <img
              src={tictactoeImg}
              alt="Tic Tac Toe Game"
              className="game-image"
            />
            <h3>Tic Tac Toe</h3>
          </Link>
          <Link to="/games/triggybird">
            <img
              src={triggyBirdImg}
              alt="Triggy Bird Game"
              className="game-image"
            />
            <h3>Triggy Bird</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;
