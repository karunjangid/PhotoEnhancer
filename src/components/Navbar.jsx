import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="neon-navbar">
      <div className="logo">
        <Link to="/" className="logo-link">PhotoEnhancer</Link>
      </div>
      <ul className="nav-menu">
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#feedback">Feedback</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
