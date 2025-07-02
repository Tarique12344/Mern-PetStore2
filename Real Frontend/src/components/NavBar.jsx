// src/components/NavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null while loading
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!token);
    setIsAdmin(adminFlag);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); // clear admin flag on logout
    navigate('/login');
  };

  // While checking login status, render nothing or a minimal skeleton
  if (isLoggedIn === null) {
    return null; // or a loading skeleton
  }

  return (
    <nav className="pet-navbar">
      <div
        className="nav-toggle"
        onClick={() => document.getElementById('navbar').classList.toggle('nav-open')}
      >
        ☰ Menu
      </div>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/about">🐶 About</Link>
        <Link to="/shop">🛒 Adoption</Link>
        {isLoggedIn && isAdmin && <Link to="/add-pet">➕ Add Pet</Link>}
        <Link to="/contact">📞 Contact</Link>

        {isLoggedIn ? (
          <span
            onClick={handleLogout}
            style={{
              cursor: 'pointer',
              color: '#4b2e2e',
              padding: '10px 20px',
              backgroundColor: '#88c7e4',
              borderRadius: '20px',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            🚪 Logout
          </span>
        ) : (
          <>
            <Link to="/login">🔑 Login</Link>
            {/* <Link to="/signup">📝 Signup</Link> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
