import React, { useState, useEffect } from "react";
import "./DinoGame.css";

function DinoGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dinoBottomRef = React.useRef(50);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      let height = 150;
      const upInterval = setInterval(() => {
        if (height <= 0) {
          clearInterval(upInterval);
          const downInterval = setInterval(() => {
            if (height >= 150) {
              clearInterval(downInterval);
              setIsJumping(false);
            }
            height += 10;
            dinoBottomRef.current = 150 - height;
          }, 20);
        }
        height -= 10;
        dinoBottomRef.current = 150 - height;
      }, 20);
    }
  };

  useEffect(() => {
    if (obstacleLeft >= 0 && !gameOver) {
      const timer = setInterval(() => {
        setObstacleLeft((prev) => prev - 2);
      }, 30);

      return () => clearInterval(timer);
    }

    if (obstacleLeft <= 0) {
      setObstacleLeft(100);
      setScore((prev) => prev + 1);
    }
  }, [obstacleLeft, gameOver]);

  useEffect(() => {
    const collision = () => {
      const dinoBottom = dinoBottomRef.current;
      if (obstacleLeft <= 10 && obstacleLeft >= 0 && dinoBottom > 100) {
        setGameOver(true);
        alert(`Game Over! Your Score: ${score}`);
      }
    };

    collision();
  }, [obstacleLeft]);

  return (
    <div className="game-area" onClick={handleJump}>
      <div
        className="dino"
        style={{
          bottom: dinoBottomRef.current + "px",
        }}
      ></div>
      <div
        className="obstacle"
        style={{
          left: obstacleLeft + "%",
        }}
      ></div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default DinoGame;
