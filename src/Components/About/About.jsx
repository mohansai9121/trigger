import { useRef, useEffect, useState } from "react";
import "./About.css";
import { quotations } from "../../assets/api/quotations.js";
import { Link } from "react-router-dom";

const About = () => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [randomQuotation, setRandomQuotation] = useState(
    quotations[Math.floor(Math.random() * quotations.length)]
  );

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth < 400 ? window.innerWidth - 40 : 300;
    canvas.height = 150;

    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Scratch Here!", canvas.width / 2 - 60, canvas.height / 2);
  };

  useEffect(() => {
    initializeCanvas();
    window.addEventListener("resize", initializeCanvas);
    return () => window.removeEventListener("resize", initializeCanvas);
  }, []);

  const handleScratchStart = (e) => {
    e.preventDefault();
    setIsScratching(true);
  };

  const handleScratchEnd = () => {
    setIsScratching(false);
  };

  const handleScratch = (e) => {
    e.preventDefault();
    if (!isScratching) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    if (x === undefined || y === undefined) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = imageData.data.length / 4;
    let scratchedPixels = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    if (scratchedPixels / totalPixels > 0.5) {
      setIsScratched(true);
    }
  };

  const handleNewCard = () => {
    setIsScratched(false);
    setIsScratching(false);
    setRandomQuotation(
      quotations[Math.floor(Math.random() * quotations.length)]
    );
    initializeCanvas();
  };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="scratch-card-container">
        {!isScratched ? (
          <canvas
            ref={canvasRef}
            onMouseDown={handleScratchStart}
            onMouseUp={handleScratchEnd}
            onMouseOut={handleScratchEnd}
            onMouseMove={handleScratch}
            onTouchStart={handleScratchStart}
            onTouchEnd={handleScratchEnd}
            onTouchMove={handleScratch}
            style={{ cursor: "pointer" }}
          ></canvas>
        ) : (
          <div className="revealed-number">{randomQuotation}</div>
        )}
        <button className="new-card-button" onClick={handleNewCard}>
          New Scratch Card
        </button>
      </div>
    </>
  );
};

export default About;
