import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">B E Y O N D&nbsp;I N V E N T O R Y</h1>
      
      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/add" onClick={() => setMenuOpen(false)}>Add Item</Link>
        <Link to="/list" onClick={() => setMenuOpen(false)}>View Items</Link>
        <Link to="/locations" onClick={() => setMenuOpen(false)}>Locations</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)} className="auth-button">Login / Sign Up</Link>
      </nav>
    </header>
  );
}

export default Header;
