import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  let emptySquares = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const [player, setPlayer] = useState("X");
  const [isFull, setIsfull] = useState(false);
  const [winner, setWinner] = useState("");
  const [winningSquares, setWinningSquares] = useState([]);
  const [squares, setSquares] = useState(emptySquares);

  const checkWinner = () => {
    if (
      squares[0] === squares[1] &&
      squares[1] === squares[2] &&
      squares[2] !== " "
    ) {
      setWinner(player);
      setWinningSquares([0, 1, 2]);
      return;
    }
    if (
      squares[3] === squares[4] &&
      squares[4] === squares[5] &&
      squares[5] !== " "
    ) {
      setWinner(player);
      setWinningSquares([3, 4, 5]);
      return;
    }
    if (
      squares[6] === squares[7] &&
      squares[7] === squares[8] &&
      squares[8] !== " "
    ) {
      setWinner(player);
      setWinningSquares([6, 7, 8]);
      return;
    }
    if (
      squares[0] === squares[3] &&
      squares[3] === squares[6] &&
      squares[6] !== " "
    ) {
      setWinner(player);
      setWinningSquares([0, 3, 6]);
      return;
    }
    if (
      squares[1] === squares[4] &&
      squares[4] === squares[7] &&
      squares[7] !== " "
    ) {
      setWinner(player);
      setWinningSquares([1, 4, 7]);
      return;
    }
    if (
      squares[2] === squares[5] &&
      squares[5] === squares[8] &&
      squares[8] !== " "
    ) {
      setWinner(player);
      setWinningSquares([2, 5, 8]);
      return;
    }
    if (
      squares[0] === squares[4] &&
      squares[4] === squares[8] &&
      squares[8] !== " "
    ) {
      setWinner(player);
      setWinningSquares([0, 4, 8]);
      return;
    }
    if (
      squares[2] === squares[4] &&
      squares[4] === squares[6] &&
      squares[6] !== " "
    ) {
      setWinner(player);
      setWinningSquares([2, 4, 6]);
      return;
    }
    if (squares.every((s) => s !== " ")) {
      setIsfull(true);
      return;
    }
  };

  const marking = (idx) => {
    console.log("marking:", player);
    if (!isFull && !winner) {
      let dummySquares = squares;
      dummySquares[idx] = player;
      setSquares(dummySquares);
      player === "X" ? setPlayer("O") : setPlayer("X");
      checkWinner();
    }
  };

  const handleReset = () => {
    setSquares(emptySquares);
    setPlayer("X");
    setWinner("");
    setIsfull(false);
  };

  return (
    <div>
      <h2>Tic Tac Toe Game</h2>
      <div className="game-position">
        <div className="game-squares">
          <button onClick={() => marking(0)}>{squares[0]}</button>
          <button onClick={() => marking(1)}>{squares[1]}</button>
          <button onClick={() => marking(2)}>{squares[2]}</button>
        </div>
        <br />
        <div className="game-squares">
          <button onClick={() => marking(3)}>{squares[3]}</button>
          <button onClick={() => marking(4)}>{squares[4]}</button>
          <button onClick={() => marking(5)}>{squares[5]}</button>
        </div>
        <br />
        <div className="game-squares">
          <button onClick={() => marking(6)}>{squares[6]}</button>
          <button onClick={() => marking(7)}>{squares[7]}</button>
          <button onClick={() => marking(8)}>{squares[8]}</button>
        </div>
      </div>
      <button onClick={handleReset}>Reset</button>
      <h3>{winner ? `winner is ${winner}` : ""}</h3>
      <h3>{!winner && isFull ? `Game draw` : ""}</h3>
      <p>{`winning squares:${winningSquares}`}</p>
    </div>
  );
};

export default TicTacToe;
