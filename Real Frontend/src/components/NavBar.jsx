// src/components/NavBar.jsx
import React from 'react';

const NavBar = () => {
  const toggleNav = () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('nav-open');
  };

  return (
    <nav className="pet-navbar" id="navbar">
      <div className="nav-toggle" onClick={toggleNav}>☰ Menu</div>
      <div className="nav-links">
        <a href="/">🏠 Home</a>
        <a href="/about">🐶 About</a>
        <a href="/services">🛁 Products</a>
        <a href="/shop">🛒 Adoption</a>
        <a href="/contact">📞 Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
