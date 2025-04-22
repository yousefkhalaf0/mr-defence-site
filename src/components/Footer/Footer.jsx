import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={`pt-5 pb-2 px-3 px-lg-5 ${styles.footStyle}`}>
      <div className="container-fluid">
        <div className="row gy-4 text-white align-items-start">
          <div className="col-lg-5">
            <div className="d-flex align-items-start gap-3">
              <img src="/imgs/logo.png" alt="Logo" className={styles.footerImg} />
              <div>
                <h5 className="mb-3">Mr.defence</h5>
                <p className={styles.small}>
                  Our Crime Monitoring Portal provides real-time crime data and empowers citizens to report incidents. Together, we enhance public safety and foster community collaboration.
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Pages</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className={styles.footerStyle}>Home</Link></li>
              <li><Link to="/about" className={styles.footerStyle}>About Us</Link></li>
              <li><Link to="/reports" className={styles.footerStyle}>Crime Reports</Link></li>
              <li><Link to="/responses" className={styles.footerStyle}>Crime Responses</Link></li>
              <li><Link to="/contact" className={styles.footerStyle}>Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Crime Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="/1" className={styles.footerStyle}>Murder</Link></li>
              <li><Link to="/2" className={styles.footerStyle}>Target Killing</Link></li>
              <li><Link to="/3" className={styles.footerStyle}>Bomb Blast</Link></li>
              <li><Link to="/4" className={styles.footerStyle}>High Way & Bank Robbery</Link></li>
              <li><Link to="/5" className={styles.footerStyle}>Snatching</Link></li>
              <li><Link to="/6" className={styles.footerStyle}>Gang Rape</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6>Newsletter</h6>
            <p className="small">Get Updates Of Latest Crimes</p>
            <form className="d-flex flex-column gap-2">
              <input type="email" placeholder="Email Address" className={`form-control ${styles.footinput}`} />
              <button type="submit" className="btn btn-danger">Subscribe now</button>
            </form>
            
          </div>
        </div>
        <div className="d-flex justify-content-between gap-3 mt-3">
        <p className="small ">© Copyright Mr.defence 2024.</p>

              <div className="d-flex gap-3 ">
                <Link to="/privacy" className={`small ${styles.footerStyle}`}>Privacy Policy</Link>
              <Link to="/terms" className={`small ${styles.footerStyle}`}>Terms & Conditions</Link>
              </div>
            </div>
      </div>
    </footer>
  );
};

export default Footer;
