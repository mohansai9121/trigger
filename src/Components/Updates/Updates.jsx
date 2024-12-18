// Import necessary libraries
import { useState } from "react";
import "./Updates.css"; // Add styles for the spinning wheel

const Updates = () => {
  const [angle, setAngle] = useState(0); // Tracks the current rotation angle
  const [spinning, setSpinning] = useState(false); // Tracks if the wheel is spinning
  const [result, setResult] = useState(null); // Tracks the selected number

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8]; // Numbers on the wheel
  //const spinDuration = 3000; // Duration of spin in ms

  // description.js

  const descriptions = [
    "Enjoy the day playing sports, taking a long walk, or working on an outdoor project!",
    "Spend time meditating, reading, or organizing thoughts for the week ahead.",
    "Perfect for hitting the gym, networking, or tackling a challenging task head-on.",
    "Ideal for staying indoors, cooking a hearty meal, or indulging in a favorite hobby.",
    "Great for diving into work, planning for the future, or learning a new skill.",
    "Spend time with loved ones, attend an event, or enjoy a fun activity.",
    "Explore a new area, try an unusual activity, or solve a lingering puzzle.",
    "Perfect for starting a new book, watching documentaries, or taking an online course.",
  ];

  const spinWheel = () => {
    if (spinning) return; // Prevent double-click during spin

    setSpinning(true);

    // Generate a random spin angle (multiple rotations + random offset)
    const randomSpin = 3600 + Math.floor(Math.random() * 360); // At least 10 full rotations
    const newAngle = angle + randomSpin;

    setAngle(newAngle);

    // Calculate result after spinning
    setTimeout(() => {
      const finalAngle = newAngle % 360; // Normalize angle to 0-360
      const divisionAngle = 360 / numbers.length; // Angle covered by one division
      const selectedNumber =
        numbers[
          Math.floor((360 - finalAngle) / divisionAngle) % numbers.length
        ];

      setResult(selectedNumber);
      setSpinning(false);
    }, 3000); // Match this with CSS transition duration
  };

  // Updates.jsx
  return (
    <div className="spin-container">
      <div className="container">
        <div className="wheel-container">
          <div className="pointer"></div>
          <div className="wheel" style={{ transform: `rotate(${angle}deg)` }}>
            {numbers.map((num, index) => (
              <div
                key={index}
                className="segment"
                style={{
                  "--index": index,
                  transform: `rotate(${(360 / numbers.length) * index}deg)`,
                }}
              >
                <span className="number" style={{ "--index": index }}>
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="spin-button" onClick={spinWheel} disabled={spinning}>
          Spin
        </button>
        {result !== null && <p className="result">Result: {result}</p>}
      </div>
      <div className="description-container">
        {result !== null && (
          <p className="description">{descriptions[result - 1]}</p>
        )}
      </div>
    </div>
  );
};

export default Updates;
