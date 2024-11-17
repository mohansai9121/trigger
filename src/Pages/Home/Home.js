import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("logged user:", user);
  }, []);

  return (
    <div className="home-design">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
