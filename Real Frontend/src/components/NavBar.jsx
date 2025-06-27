import React, { useState } from 'react';
import '../styles/homepage.css'


const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(prev => !prev);

  const closeNav = () => setNavOpen(false);

  return (
    <nav className={`pet-navbar ${navOpen ? 'nav-open' : ''}`}>
      <div
        className="nav-toggle"
        onClick={toggleNav}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleNav();
        }}
        aria-label="Toggle navigation menu"
      >
        ☰ Menu
      </div>

      <div className="nav-links">
        <a href="/" onClick={closeNav}>🏠 Home</a>
        <a href="/about" onClick={closeNav}>🐶 About</a>
        <a href="/services" onClick={closeNav}>🛁 Products</a>
        <a href="/shop" onClick={closeNav}>🛒 Adoption</a>
        <a href="/contact" onClick={closeNav}>📞 Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
