import React, { useState } from 'react';
import { db } from '../../firebase'; // Importing db from your Firebase file
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // State management for the newsletter form
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, success, error, loading

  // Simple email validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Add email and subscribeDate to Firestore
      const subscribersCollection = collection(db, 'subscribers');
      await addDoc(subscribersCollection, {
        email: email,
        subscribeDate: Timestamp.fromDate(new Date()) // Store current date in Firestore
      });

      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail(''); // Clear input after successful submission

      // Auto-dismiss the alert after 2-3 seconds
      setTimeout(() => {
        setMessage('');
        setStatus('idle');
      }, 3000); // Dismiss after 3 seconds
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Error adding document: ', error);

      // Auto-dismiss the error alert
      setTimeout(() => {
        setMessage('');
        setStatus('idle');
      }, 3000); // Dismiss after 3 seconds
    }
  };

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
              <li><Link to="/CrimeReports" className={styles.footerStyle}>Crime Reports</Link></li>
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
              <li><Link to="/4" className={styles.footerStyle}>Highway & Bank Robbery</Link></li>
              <li><Link to="/5" className={styles.footerStyle}>Snatching</Link></li>
              <li><Link to="/6" className={styles.footerStyle}>Gang Rape</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-3">
            <h6>Newsletter</h6>
            <p className="small">Get Updates Of Latest Crimes</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${styles.footinput}`}
              />
              <button type="submit" className="btn btn-danger" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe now'}
              </button>
            </form>

            {/* Bootstrap Alert for Success/Error Message */}
            {message && (
              <div
                className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mt-3`}
                role="alert"
              >
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between gap-3 mt-3">
          <p className="small">© Copyright Mr.defence 2024.</p>

          <div className="d-flex gap-3">
            <Link to="/privacy" className={`small ${styles.footerStyle}`}>Privacy Policy</Link>
            <Link to="/terms" className={`small ${styles.footerStyle}`}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
