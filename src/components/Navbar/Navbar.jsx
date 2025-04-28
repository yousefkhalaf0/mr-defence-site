import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "./theSmallLogo.svg";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowDropdown((prev) => !prev);
    } else {
      navigate('/login');
    }
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar fixed-top navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        {/* Left: Logo + Site Name */}
        <NavLink className={`navbar-brand ${styles["navbar-brand"]}`} to="/">
          <img src={logo} alt="Logo" className={styles["brand-logo"]} />
          Mr <strong>. Defence</strong>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          onClick={toggleNavbar}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} ${styles.iconToggle}`}></i>
        </button>

        {/* Right: Nav links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav align-items-center">
            {/* Links */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/CrimeReports">Crime Reports</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/Explore">Explore</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/tutorials">Tutorials</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${styles["nav-link"]} ${isActive ? styles.activeLink : ""}`} to="/contact">Contact Us</NavLink>
            </li>

            {/* User Icon + Dropdown */}
            <li className="nav-item position-relative" ref={dropdownRef}>
              <button
                className={styles.userIconButton}
                onClick={handleUserClick}
                title={isLoggedIn ? "Profile Options" : "Login"}
              >
                <FaUserCircle 
                  size={32} 
                  className={isLoggedIn ? styles.loggedInIcon : ""} 
                />
                {isLoggedIn && (
                  <span className={styles.loggedInIndicator}></span>
                )}
              </button>

              {isLoggedIn && showDropdown && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleProfile} className={styles.dropdownItem}>Profile</button>
                  <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
                </div>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
