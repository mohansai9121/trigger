import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./CarGame.css";

const Road = styled.div`
  position: relative;
  width: 600px;
  overflow: hidden;
  height: 500px;
  border: 2px solid white;
  background-color: grey;
`;

const move = keyframes`
  from{
    top:0px;
  }
  to{
    top:470px;
  }
`;

const Obstacle = styled.div`
  position: absolute;
  width: 100px;
  height: 140px;
  background: red;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const RoadLine1 = styled.div`
  position: absolute;
  width: 10px;
  height: 50px;
  background: white;
  transform: translateX(-50%);
  right: 33%;
  animation: ${move} 2s linear infinite;
`;

const RoadLine2 = styled.div`
  position: absolute;
  width: 10px;
  height: 50px;
  background: white;
  transform: translateX(-50%);
  left: 33%;
  animation: ${move} 2s linear infinite;
`;

const Car = styled.div`
  position: absolute;
  width: 100px;
  height: 140px;
  bottom: 5px;
  left: ${(props) => props.position}px;
  background: blue;
  transition: left 0.1s ease-in-out;
`;

const CarGame = () => {
  const [obstacle, setObstacle] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [carPosition, setCarPosition] = useState(100);
  const [gameOver, setGameover] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setGameover(false);
    setGameStarted(true);
    let positions = { top: -200, left: Math.floor(Math.random() * 500) };
    setObstacle(positions);
  };

  const resetObstaclePosition = () => {
    let positions = { top: -200, left: Math.floor(Math.random() * 500) };
    setObstacle(positions);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" && carPosition > 0) {
      setCarPosition((pos) => pos - 20);
    }
    if (e.key === "ArrowRight" && carPosition < 500) {
      setCarPosition((pos) => pos + 20);
    }
  };

  const detectCollision = () => {
    const carTop = 355;
    //const carBottom = 495;
    const carLeft = carPosition;
    const carRight = carPosition + 100;

    //const obstacleTop = obstacle.top;
    const obstacleBottom = obstacle.top + 140;
    const obstacleLeft = obstacle.left;
    const obstacleRight = obstacle.left + 100;

    if (
      (obstacleBottom >= carTop &&
        obstacleLeft >= carLeft &&
        obstacleLeft <= carRight) ||
      (obstacleBottom >= carTop &&
        obstacleRight <= carRight &&
        obstacleRight >= carLeft)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    const obstacleLoop = setInterval(() => {
      setObstacle((pos) => {
        const newTop = pos.top + 10;
        if (newTop > 500) {
          setScore((score) => score + 1);
          resetObstaclePosition();
          return { ...Obstacle, top: newTop };
        }
        return { ...obstacle, top: newTop };
      });
    }, 50);
    if (detectCollision()) {
      setGameStarted(false);
      setGameover(true);
      clearInterval(obstacleLoop);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(obstacleLoop);
    };
  }, [obstacle]);

  return (
    <div className="game-display">
      <div>
        <h1>Car game</h1>
        <Road>
          <RoadLine1></RoadLine1>
          <RoadLine2></RoadLine2>
          {gameStarted ? (
            <Obstacle left={obstacle.left} top={obstacle.top} />
          ) : (
            <></>
          )}
          <Car position={carPosition} />
        </Road>
      </div>
      <div>
        <div>
          <button onClick={startGame}>Start Game</button>
        </div>
        <h3>Score:{score}</h3>
        <h4>{gameOver ? "Game over" : ""}</h4>
      </div>
    </div>
  );
};

export default CarGame;
