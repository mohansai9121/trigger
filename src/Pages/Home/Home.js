import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("logged user:", user);
  }, []);

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
