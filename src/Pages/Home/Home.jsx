import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import TriggerFrog from "../../3dModels/TriggerFrog.jsx";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Weather from "../../Components/Weather/Weather.jsx";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ChatBot from "../../Components/ChatBot/ChatBot.jsx";
import "./Home.css";

const Home = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      {/* 3D Background Canvas */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0.7,
          marginTop: "10vh",
          width: "100vw",
          height: "100vh",
          zIndex: 0, // Lower z-index for background
        }}
      >
        <Canvas>
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

      {/* Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 1, // Higher z-index for content
          width: "100%",
          height: "400vh", // Adjust based on your content
        }}
      >
        {/* Navigation Links - Fixed Position */}
        <div
          style={{
            position: "fixed",
            left: "20vw",
            top: "1vh",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <AnchorLink href="#first" style={anchorLinkStyle}>
            Home
          </AnchorLink>
          <AnchorLink href="#second" style={anchorLinkStyle}>
            Music
          </AnchorLink>
          <AnchorLink href="#third" style={anchorLinkStyle}>
            Quiz
          </AnchorLink>
          <AnchorLink href="#forth" style={anchorLinkStyle}>
            Video
          </AnchorLink>
          <AnchorLink href="#fifth" style={anchorLinkStyle}>
            Games
          </AnchorLink>
          <AnchorLink href="#sixth" style={anchorLinkStyle}>
            Updates
          </AnchorLink>
          <AnchorLink href="#seventh" style={anchorLinkStyle}>
            About
          </AnchorLink>
        </div>
        <div className="chat-bot-container">{openChat && <ChatBot />}</div>

        {/* Content Sections */}
        <div id="first" style={sectionStyle}>
          <div style={contentStyle}>
            <Weather />
          </div>
        </div>

        <div id="second" style={{ ...sectionStyle, marginLeft: "60%" }}>
          <Link to="/musicPlayer" style={linkStyle}>
            Music Player
          </Link>
        </div>

        <div id="third" style={sectionStyle}>
          <Link to="/quiz" style={linkStyle}>
            Quiz
          </Link>
        </div>

        <div id="forth" style={{ ...sectionStyle, marginLeft: "100%" }}>
          <Link to="/videoPlayer" style={linkStyle}>
            Video Player
          </Link>
        </div>

        <div id="fifth" style={sectionStyle}>
          <Link to="/games" style={linkStyle}>
            Games
          </Link>
        </div>

        <div id="sixth" style={{ ...sectionStyle, marginLeft: "60%" }}>
          <Link to="/updates" style={linkStyle}>
            Updates
          </Link>
        </div>

        <div id="seventh" style={sectionStyle}>
          <Link to="/about" style={linkStyle}>
            About
          </Link>
        </div>
      </div>

      {/* Outlet for nested routes */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Outlet />
      </div>
    </>
  );
};

// Styles
const anchorLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px 24px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "8px",
  fontSize: "18px",
  transition: "transform 0.3s, background-color 0.3s",
  display: "inline-block",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const contentStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  padding: "20px",
  borderRadius: "8px",
  color: "white",
  minWidth: "200px",
};

const sectionStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
};

export default Home;
