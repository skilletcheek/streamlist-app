import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-logo">🎬</span>
        <span className="brand-name">EZTech<span className="accent">Movie</span></span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            StreamList
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;