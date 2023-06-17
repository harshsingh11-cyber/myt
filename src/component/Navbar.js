import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
    <div className="navContainer">
      <span className="logo">My - Travely</span>
      <div className="navItems">
        <button className="navButton"> <Link className="navButton" to='/signup'>Sign up</Link></button>
        <button className="navButton"> <Link className="navButton" to='/login'>LogIn</Link></button>


      </div>
    </div>
  </div>
  )
}

export default Navbar
