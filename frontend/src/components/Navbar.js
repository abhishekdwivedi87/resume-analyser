import React from "react";
import "./Navbar.css";

function Navbar({ toggleTheme }) {
  return (
    <nav className="navbar">
      <h1 className="logo">AI Resume Analyzer</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </nav>
  );
}

export default Navbar;
