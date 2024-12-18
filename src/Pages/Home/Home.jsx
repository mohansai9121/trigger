import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import TriggerFrog from "../../3dModels/TriggerFrog.jsx";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Weather from "../../Components/Weather/Weather.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../../Components/ChatBot/ChatBot.jsx";
import "./Home.css";

const Home = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <div className="canvas-container">
        <Canvas style={{ width: "100vw", height: "100vh" }}>
          <ambientLight intensity={2} />
          <TriggerFrog onClick={() => setOpenChat(!openChat)} />
          <OrbitControls
            enableZoom
            autoRotate
            maxDistance={10}
            minDistance={5}
          />
        </Canvas>
      </div>

      <div className="content-container">
        <div className="nav-container">
          <AnchorLink href="#first" className="anchorLinkStyle">
            Home
          </AnchorLink>
          <AnchorLink href="#second" className="anchorLinkStyle">
            Music
          </AnchorLink>
          <AnchorLink href="#third" className="anchorLinkStyle">
            Quiz
          </AnchorLink>
          <AnchorLink href="#forth" className="anchorLinkStyle">
            Video
          </AnchorLink>
          <AnchorLink href="#fifth" className="anchorLinkStyle">
            Games
          </AnchorLink>
          <AnchorLink href="#sixth" className="anchorLinkStyle">
            Updates
          </AnchorLink>
          <AnchorLink href="#seventh" className="anchorLinkStyle">
            About
          </AnchorLink>
        </div>
        <div className="chat-bot-container">{openChat && <ChatBot />}</div>

        <div id="first" className="sectionStyle">
          <div className="contentStyle">
            <Weather />
          </div>
        </div>

        <div id="second" className="sectionStyle" style={{ marginLeft: "60%" }}>
          <Link to="/musicPlayer" className="linkStyle">
            Uplift your mood, Reduce stress...just listen to the songs
            <br />
            <span style={{ textDecoration: "underline" }}>Music Player</span>
          </Link>
        </div>

        <div id="third" className="sectionStyle">
          <Link to="/quiz" className="linkStyle">
            Challenge your brain, broaden your knowledge...try
            <br />
            <span style={{ textDecoration: "underline" }}>Quiz</span>
          </Link>
        </div>

        <div id="forth" className="sectionStyle" style={{ marginLeft: "100%" }}>
          <Link to="/videoPlayer" className="linkStyle">
            Watch videos, get motivated, laugh, cry, and enjoy...
            <br />
            <span style={{ textDecoration: "underline" }}>Video Player</span>
          </Link>
        </div>

        <div id="fifth" className="sectionStyle">
          <Link to="/games" className="linkStyle">
            Play games, entertain yourself, and enjoy...
            <br />
            <span style={{ textDecoration: "underline" }}>Games</span>
          </Link>
        </div>

        <div id="sixth" className="sectionStyle" style={{ marginLeft: "60%" }}>
          <Link to="/updates" className="linkStyle">
            Spin the wheel, and know the day&apos;s updates...
            <br />
            <span style={{ textDecoration: "underline" }}>Spin the wheel</span>
          </Link>
        </div>

        <div id="seventh" className="sectionStyle">
          <Link to="/about" className="linkStyle">
            Scratch the card, and know the quote of the day...
            <br />
            <span style={{ textDecoration: "underline" }}>
              Scratch the card
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
