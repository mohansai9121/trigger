import "./ChessBoard.css";
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";

const ChessBoard = ({ board, onSquareClick, selectedSquare }) => {
  return (
    <div className="chessboard">
      {board.flat().map((square, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;

        const isSelected =
          selectedSquare === `${String.fromCharCode(97 + col)}${8 - row}`;
        const piece = square ? `${square.color}${square.type}` : null; // e.g., 'wp' (white pawn)

        return (
          <div
            key={index}
            className={`square ${(row + col) % 2 === 0 ? "light" : "dark"} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => onSquareClick(row, col)}
          >
            {piece && piece === "wp" ? (
              <FaChessPawn
                style={{
                  color: "blue",
                  fontSize: "30px",
                }}
              />
            ) : piece === "wr" ? (
              <FaChessRook style={{ color: "blue", fontSize: "30px" }} />
            ) : piece === "wn" ? (
              <FaChessKnight style={{ color: "blue", fontSize: "30px" }} />
            ) : piece === "wb" ? (
              <FaChessBishop style={{ color: "blue", fontSize: "30px" }} />
            ) : piece === "wk" ? (
              <FaChessKing style={{ color: "blue", fontSize: "30px" }} />
            ) : piece === "wq" ? (
              <FaChessQueen style={{ color: "blue", fontSize: "30px" }} />
            ) : piece === "bp" ? (
              <FaChessPawn style={{ color: "black", fontSize: "30px" }} />
            ) : piece === "br" ? (
              <FaChessRook style={{ color: "black", fontSize: "30px" }} />
            ) : piece === "bn" ? (
              <FaChessKnight style={{ color: "black", fontSize: "30px" }} />
            ) : piece === "bb" ? (
              <FaChessBishop style={{ color: "black", fontSize: "30px" }} />
            ) : piece === "bk" ? (
              <FaChessKing style={{ color: "black", fontSize: "30px" }} />
            ) : piece === "bq" ? (
              <FaChessQueen style={{ color: "black", fontSize: "30px" }} />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
