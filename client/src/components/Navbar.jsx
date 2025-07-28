import React from "react";
import { assets } from "../assets/assets";
import "./Navbar.css"; // 👈 Add this import

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Mainlogo" />
    </div>
  );
};

export default Navbar;
