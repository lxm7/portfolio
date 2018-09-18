import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <Link className="content content--top" to="/">
        <h2>Alex Moreton</h2>
        <p>Web developer portfolio</p>
      </Link>
      <div className="content content--top">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <a className="navbar-item" href='https://github.com/lxm7'>Github</a>
      </div>
    </div>
  </nav>
)

export default Navbar
