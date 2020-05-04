import React from "react";
import { Link } from "gatsby";

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <Link className="content content--top" to="/">
        <h2>Alex Moreton</h2>
      </Link>
      <p className="fat-p">Front End / Full-Stack Developer</p>
      <p>Quick portfolio site built with Gatsby, NetlifyCMS and AWS</p>
      <div className="content content--top">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <a className="navbar-item" href="https://github.com/lxm7">
          Github
        </a>
        <a
          className="navbar-item"
          href="https://www.linkedin.com/in/alex-moreton-3519633b/"
        >
          LinkedIn
        </a>
        <a
          className="navbar-item"
          href="https://stackoverflow.com/users/1341935/lxm7?tab=profile"
        >
          Stackoverflow
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
