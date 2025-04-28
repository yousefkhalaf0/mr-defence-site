import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "./theSmallLogo.svg";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignOutAlt } from 'react-icons/fa';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      toast.error("Error logging out. Please try again.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

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
          <ul className="navbar-nav align-items-center">
            {/* Links */}
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
                to="/CrimeReports"
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
                to="/Explore"
              >
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles["nav-link"]} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                to="/tutorials"
              >
                Tutorials
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

            {/* User Icon and Logout */}
            <li className="nav-item d-flex align-items-center">
              <button
                className={styles.userIconButton}
                onClick={handleUserClick}
                title={isLoggedIn ? "Profile" : "Login"}
              >
                <FaUserCircle
                  size={32}
                  className={isLoggedIn ? styles.loggedInIcon : ""}
                />
                {isLoggedIn && (
                  <span className={styles.loggedInIndicator}></span>
                )}
              </button>
              {isLoggedIn && (
                <button
                className={`btn fs-6 btn-outline-light ms-2 ${styles.logoutButton}`}
                onClick={handleLogout}
                title="Logout" // إضافة عنوان توضيحي يظهر عند hover
              >
                <FaSignOutAlt /> {/* الأيقونة بدلاً من النص */}
              </button>
              
              )}
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
