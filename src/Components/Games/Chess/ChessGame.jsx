import { Chess } from "chess.js"; // Import Chess.js
import { useState } from "react";
import ChessBoard from "./ChessBoard"; // Your board component
import { Link } from "react-router-dom";

const ChessGame = () => {
  const [game] = useState(new Chess()); // Initialize a Chess.js game
  const [board, setBoard] = useState(game.board()); // Initial board state
  const [selectedSquare, setSelectedSquare] = useState(null); // Track selected square

  // Handle square clicks
  const onSquareClick = (row, col) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}`; // Convert to algebraic notation (e.g., 'e4')
    try {
      if (selectedSquare) {
        // Attempt to make the move
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        }); // Auto-promote to queen
        if (move) {
          setBoard(game.board()); // Update the board state
        }
        setSelectedSquare(null); // Deselect the square after moving
      } else if (game.get(square)) {
        // Select square if there's a piece on it
        setSelectedSquare(square);
      }
    } catch (err) {
      console.log(err);
      setSelectedSquare(null);
    }
  };

  return (
    <div>
      <Link to="/games">
        <button>Games</button>
      </Link>
      <h1>Chess Game</h1>
      <ChessBoard
        board={board}
        onSquareClick={onSquareClick}
        selectedSquare={selectedSquare}
      />
      <div>
        <button onClick={() => resetGame()}>Reset Game</button>
      </div>
    </div>
  );

  // Reset the game
  function resetGame() {
    game.reset();
    setBoard(game.board());
    setSelectedSquare(null);
  }
};

export default ChessGame;
