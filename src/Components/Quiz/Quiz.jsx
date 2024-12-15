import { useState, useEffect } from "react";
import { allQuestions } from "../../assets/api/questions";
import "./Quiz.css";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // Timer starts at 15 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNext(); // Automatically move to the next question when time runs out
    }
  }, [timeLeft]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption === allQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setTimeLeft(15); // Reset timer for the next question
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
    setSelectedOption("");
    setTimeLeft(15); // Reset timer
  };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="quiz-container">
        {!isQuizFinished ? (
          <div>
            <h2>
              Question {currentQuestion + 1}/{allQuestions.length}
            </h2>
            <p>{allQuestions[currentQuestion].question}</p>
            <div>
              {allQuestions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  style={{ display: "block", margin: "10px 0" }}
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <p className="timer">Time Left: {timeLeft}s</p>
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={!selectedOption ? "disabled" : ""}
              style={{ marginTop: "20px" }}
            >
              {currentQuestion === allQuestions.length - 1
                ? "Submit Quiz"
                : "Next"}
            </button>
          </div>
        ) : (
          <div>
            <h2>
              Your Score: {score} / {allQuestions.length}
            </h2>
            <button onClick={handleRestart} style={{ marginTop: "20px" }}>
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
