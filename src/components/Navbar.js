import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <h2>Alex Moreton</h2>
        <p>Web developer portfolio</p>
      </div>
      <div className="navbar-start" style={{ margin: '4em 0' }}>
        <Link className="navbar-item" to="/about">
          <h2>About</h2>
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
