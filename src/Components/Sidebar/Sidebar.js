import React from "react";
import { FaBell, FaHome, FaItunesNote, FaVideo } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div>
        <div>
          <FaHome />
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        <div>
          <FaBell />
          <Link to="/notifications" className="link">
            Notifications
          </Link>
        </div>
        <div>
          <FaItunesNote />
          <Link to="/music" className="link">
            Music
          </Link>
        </div>
        <div>
          <FaVideo />
          <Link to="/videos" className="link">
            Videos
          </Link>
        </div>
        <div>
          <IoIosMore />
          More
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
