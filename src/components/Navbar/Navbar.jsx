import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "./theSmallLogo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        {/* Left: Logo + Site Name */}
        <NavLink className={`navbar-brand ${styles["navbar-brand"]}`} to="/">
          <img src={logo} alt="Logo" className={styles["brand-logo"]} />
          Mr <strong>.Defence</strong>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          onClick={toggleNavbar}
        >
          <i
            className={`fas ${isOpen ? "fa-times" : "fa-bars"} ${
              styles.iconToggle
            }`}
          ></i>
        </button>

        {/* Right: Nav links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/about"
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/crime-reports"
              >
                Crime Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/crime-responses"
              >
                Crime Response's
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
