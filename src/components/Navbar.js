import React, { useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import feather from "feather-icons"; // Import feather icons for usage
import "./Navbar.scss"; // Make sure the styles are linked properly

function Navbar() {
  useEffect(() => {
    // This will replace the data-feather attributes with SVG icons
    feather.replace();
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <NavLink to="/dashboard" className="navbar__link">
            <i data-feather="home"></i><span>Home</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/dashboard/settings" className="navbar__link">
            <i data-feather="settings"></i><span>Settings</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/dashboard/profile" className="navbar__link">
            <i data-feather="user"></i><span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
