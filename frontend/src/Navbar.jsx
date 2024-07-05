import React from "react";
import logo from "./images/logo.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img className="logo_img" src={logo} alt="" />
        <ul>
          <li>
            <a className="active" href="#home">
              Home
            </a>
          </li>
          <li>
            <a href="#news">Features</a>
          </li>
          <li>
            <a href="#contact">Blog</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
