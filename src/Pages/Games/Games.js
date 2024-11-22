import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div>
      <h1>Games</h1>
      <center>
        <Link to="/games/tictactoe">
          <button>Tic tac Toe</button>
        </Link>
        <br />
        <br />
        <Link to="/games/cargame">
          <button>Car Game</button>
        </Link>
        <br />
        <br />
        <Link to="/games/chess">
          <button>Chess game</button>
        </Link>
        <br />
        <br />
        <Link to="/games/flappybird">
          <button>Flappy bird</button>
        </Link>
        <Link to="/games/dinogame">
          <button>Dino game</button>
        </Link>
      </center>
    </div>
  );
};

export default Games;
