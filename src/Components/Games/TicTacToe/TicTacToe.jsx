import { useState } from "react";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Calculate winner function
  const calculateWinner = (squares) => {
    const winningLines = [
      [0, 1, 2], // horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonal
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle click function
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    // Check if game is over (winner or draw)
    if (calculateWinner(newSquares) || newSquares.every((square) => square)) {
      setGameOver(true);
    }
  };

  // Reset game function
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  // Get game status
  const getStatus = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every((square) => square)) {
      return "Game Draw!";
    } else {
      return `Next player: ${isXNext ? "X" : "O"}`;
    }
  };

  return (
    <>
      <Link to="/games">
        <button>Games</button>
      </Link>
      <div className="container">
        <h2 className="title">Tic Tac Toe</h2>

        <div className="board">
          {squares.map((square, i) => (
            <button key={i} className="square" onClick={() => handleClick(i)}>
              {square}
            </button>
          ))}
        </div>

        <div className="status">{getStatus()}</div>

        <button className="newGameButton" onClick={resetGame}>
          New Game
        </button>
      </div>
    </>
  );
};

export default TicTacToe;
