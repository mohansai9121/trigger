import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./TriggyFrogGame.css";

const GameArea = styled.div`
  width: 600px;
  height: 500px;
  position: relative;
  border: 2px solid white;
  border-radius: 5px;
  overflow: hidden;
`;

const Obstacle = styled.div`
  height: 70px;
  width: 100px;
  bottom: 0px;
  position: absolute;
  background: red;
  right: 0px;
`;

const Frog = styled.div`
  width: 70px;
  height: 50px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
  background: green;
  left: 100px;
  transition: top 0.5s ease-in-out;
`;

const GameOverDiv = styled.div`
  width: 100%;
  height: 100px;
  background: rgba(180, 0, 0, 0.7);
  color: blue;
  top: 100px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartGameDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(0, 180, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 100px;
  left: 100px;
`;

const TriggyFrogGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [obstacleRight, setObstacleRight] = useState(-100);
  const [frogBottom, setFrogBottom] = useState(0);
  const [jump, setJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setFrogBottom(0);
    setObstacleRight(-160);
    setJump(false);
    setScore(0);
  };

  const jumping = () => {
    setJump(true);
  };

  useEffect(() => {
    if (gameStarted) {
      if (jump) {
        setFrogBottom(100);
        setTimeout(() => {
          setJump(false);
          setFrogBottom(0);
        }, 800);
      }
    }
  }, [gameStarted, jump]);

  useEffect(() => {
    const detectCollision = () => {
      if (gameStarted) {
        if (obstacleRight >= 350 && obstacleRight <= 500 && frogBottom <= 70) {
          return true;
        } else {
          return false;
        }
      }
    };

    let obstacleInterval;
    if (gameStarted) {
      if (obstacleRight <= 600) {
        obstacleInterval = setInterval(() => {
          setObstacleRight((pre) => pre + 20);
        }, 50);
      } else {
        setScore((score) => score + 1);
        setObstacleRight(-70);
      }
    }
    if (detectCollision()) {
      setGameOver(true);
      setGameStarted(false);
    }
    return () => {
      clearInterval(obstacleInterval);
    };
  }, [obstacleRight, gameStarted, frogBottom]);

  return (
    <div className="triggyFrog-display">
      <div>
        <h2>Triggy Frog</h2>
        <GameArea onClick={jumping}>
          <Obstacle style={{ right: `${obstacleRight}px` }} />
          <Frog style={{ bottom: `${frogBottom}px` }} />
          {gameOver ? (
            <GameOverDiv>
              <h3>Game over</h3>
            </GameOverDiv>
          ) : (
            <></>
          )}
          {!gameStarted ? (
            <StartGameDiv onClick={startGame}>
              Tap Here to start game
            </StartGameDiv>
          ) : (
            <></>
          )}
        </GameArea>
      </div>
      <div>
        <button onClick={startGame}>Start Game</button>
        <h3>Score:{score}</h3>
        {gameOver ? <h2>Game over</h2> : <></>}
      </div>
    </div>
  );
};

export default TriggyFrogGame;
