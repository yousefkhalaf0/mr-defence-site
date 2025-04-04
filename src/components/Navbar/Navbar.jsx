import React, { useState } from 'react';
import styles from './Navbar.module.css';
//import  Link
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg  ${styles.navbar}`}>
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Navbar</Link>
        <button 
          className={`navbar-toggler ${styles.navbarToggler}`} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} ${styles.iconToggle}`}></i>
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <Link className="nav-link " to="/">home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">explore</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">about</Link>
            </li><li className="nav-item">
              <Link className="nav-link" to="/premium">premium</Link>
            </li><li className="nav-item">
              <Link className="nav-link" to="/careers">careers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/enterprise">enterprise</Link>
            </li>
          </ul>
          <div className={`d-flex ms-3 ${styles.authButtons}`}>
            <button className={`btn btn-outline-light me-2 ${styles.btn}`}>
              <i className="fas fa-sign-in-alt me-2"></i> 
              Login
            </button>
            <button className={`btn btn-light ${styles.btn}`}>
              <i className="fas fa-user-plus me-2"></i> 
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;