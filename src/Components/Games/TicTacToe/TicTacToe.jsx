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
      <div style={styles.container}>
        <h2 style={styles.title}>Tic Tac Toe</h2>

        <div style={styles.board}>
          {squares.map((square, i) => (
            <button
              key={i}
              style={styles.square}
              onClick={() => handleClick(i)}
            >
              {square}
            </button>
          ))}
        </div>

        <div style={styles.status}>{getStatus()}</div>

        <button style={styles.newGameButton} onClick={resetGame}>
          New Game
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  board: {
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
    gap: "10px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  square: {
    width: "80px",
    height: "80px",
    backgroundColor: "#fff",
    border: "2px solid #333",
    borderRadius: "8px",
    fontSize: "2em",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#333",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f8f8f8",
    },
  },
  status: {
    marginTop: "20px",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#333",
  },
  newGameButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
};

export default TicTacToe;
