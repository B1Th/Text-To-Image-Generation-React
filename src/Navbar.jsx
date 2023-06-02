import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h2>AIPIC</h2>
        <ul>
          <li>
            <a class="active" href="#home">
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
