import { useEffect, useState } from "react";
import styled from "styled-components";
import "./TriggyBirdGame.css";
import { Link } from "react-router-dom";

const GameArea = styled.div`
  width: 600px;
  height: 500px;
  position: relative;
  border: 2px solid white;
  border-radius: 5px;
  overflow: hidden;
`;

const Bird = styled.div`
  width: 30px;
  height: 20px;
  position: absolute;
  top: 200px;
  background: red;
  left: 50px;
`;

const GameOver = styled.div`
  position: absolute;
  width: 600px;
  height: 150px;
  top: 150px;
  background: rgba(180, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: blue;
`;

const Pipe = styled.div`
  position: absolute;
  width: 60px;
  height: 200px;
  right: 200px;
  background: white;
  transition: 0.01s linear ease-in-out;
`;

const TriggyBirdGame = () => {
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeRight, setPipeRight] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);
  const [birdTop, setBirdTop] = useState(200);
  const [gameOver, setGameover] = useState(false);
  const [score, setScore] = useState(0);

  const birdRaise = () => {
    setBirdTop((top) => top - 30);
  };

  const startGame = () => {
    setScore(0);
    setGameStarted(true);
    setGameover(false);
    setPipeHeight(200);
    setPipeRight(200);
    setBirdTop(200);
  };

  useEffect(() => {
    const generateNewPipe = () => {
      setPipeHeight(Math.floor(Math.random() * 300));
    };
    let pipeInterval;
    if (gameStarted && !gameOver) {
      if (pipeRight < 610) {
        pipeInterval = setInterval(() => {
          setPipeRight((pre) => pre + 20);
        }, 100);
      } else {
        setScore((s) => s + 1);
        setPipeRight(-10);
        generateNewPipe();
      }
    }
    return () => {
      clearInterval(pipeInterval);
    };
  }, [pipeHeight, pipeRight, gameStarted, gameOver]);

  useEffect(() => {
    const checkCollision = () => {
      if (
        birdTop >= 490 ||
        birdTop <= 0 ||
        (pipeRight > 460 && pipeRight < 550 && birdTop < pipeHeight) ||
        (pipeRight > 460 && pipeRight < 550 && birdTop > pipeHeight + 120)
      ) {
        setGameover(true);
      }
    };

    let birdInterval;
    if (gameStarted && !gameOver) {
      if (birdTop < 500) {
        birdInterval = setInterval(() => {
          setBirdTop((top) => top + 10);
        }, 100);
      }
    }
    if (checkCollision()) {
      setGameover(true);
      setGameStarted(false);
    }
    return () => {
      clearInterval(birdInterval);
    };
  }, [gameStarted, birdTop, gameOver, pipeRight, pipeHeight]);

  return (
    <div className="triggyBird-display">
      <div>
        <Link to="/games">
          <button>Games</button>
        </Link>
        <h2>Trigging Bird</h2>
        <GameArea onClick={birdRaise}>
          <Bird style={{ top: `${birdTop}px` }} />
          <Pipe
            style={{ height: `${pipeHeight}px`, right: `${pipeRight}px` }}
          />
          <Pipe
            style={{
              bottom: "0px",
              height: `${500 - pipeHeight - 120}px`,
              right: `${pipeRight}px`,
            }}
          />
          {gameOver ? (
            <GameOver>
              <h3>Game Over</h3>
            </GameOver>
          ) : (
            <></>
          )}
        </GameArea>
      </div>
      <div>
        <button onClick={startGame}>Start</button>
        <h3>Score:{score}</h3>
      </div>
    </div>
  );
};

export default TriggyBirdGame;
