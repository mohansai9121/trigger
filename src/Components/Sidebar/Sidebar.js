import React from "react";
import { FaBell, FaHome, FaItunesNote } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const Sidebar = () => {
  return (
    <div>
      <div>
        <div>
          <FaHome />
          Home
        </div>
        <div>
          <FaBell />
          Notifications
        </div>
        <div>
          <FaItunesNote />
          Music
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
