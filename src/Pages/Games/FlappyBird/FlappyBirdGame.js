import React, { useState, useEffect, useRef } from "react";
import "./FlappyBirdGame.css";

function FlappyBirdGame() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [pipePosition, setPipePosition] = useState(500);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const birdRef = useRef();
  const gameAreaHeight = 500;
  const gameAreaWidth = 500;
  const pipeWidth = 50;
  const birdSize = 30;
  const gravity = 4;
  const jumpHeight = 50;

  // Handle bird falling
  useEffect(() => {
    let gravityInterval;
    if (!gameOver) {
      gravityInterval = setInterval(() => {
        setBirdPosition((prev) =>
          Math.min(prev + gravity, gameAreaHeight - birdSize)
        );
      }, 30);
    }

    return () => clearInterval(gravityInterval);
  }, [gameOver]);

  // Handle pipes moving
  useEffect(() => {
    let pipeInterval;
    if (!gameOver) {
      pipeInterval = setInterval(() => {
        setPipePosition((prev) => {
          if (prev <= -pipeWidth) {
            setPipeHeight(Math.random() * (gameAreaHeight - 100));
            setScore((s) => s + 1);
            return gameAreaWidth;
          }
          return prev - 5;
        });
      }, 30);
    }

    return () => clearInterval(pipeInterval);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    const isBirdHittingPipe =
      birdPosition < pipeHeight || birdPosition > pipeHeight + 150;
    const isBirdInPipeZone =
      pipePosition <= birdSize + 20 && pipePosition >= -birdSize;

    if (isBirdHittingPipe && isBirdInPipeZone) {
      setGameOver(true);
    }
  }, [birdPosition, pipePosition, pipeHeight]);

  const handleJump = () => {
    if (!gameOver) {
      setBirdPosition((prev) => Math.max(prev - jumpHeight, 0));
    }
  };

  const restartGame = () => {
    setBirdPosition(250);
    setPipePosition(500);
    setPipeHeight(200);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="game-area" onClick={handleJump}>
      <div
        className="bird"
        style={{
          top: `${birdPosition}px`,
          width: `${birdSize}px`,
          height: `${birdSize}px`,
        }}
      ></div>
      <div
        className="pipe"
        style={{
          left: `${pipePosition}px`,
          height: `${pipeHeight}px`,
          top: `0`,
          width: `${pipeWidth}px`,
        }}
      ></div>
      <div
        className="pipe"
        style={{
          left: `${pipePosition}px`,
          height: `${gameAreaHeight - pipeHeight - 150}px`,
          bottom: `0`,
          width: `${pipeWidth}px`,
        }}
      ></div>
      {gameOver && (
        <div className="game-over">
          <h1>Game Over</h1>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default FlappyBirdGame;
