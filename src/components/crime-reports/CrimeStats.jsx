// For CrimeStats.jsx
import React from "react";
import styles from "./CrimeStats.module.css";
import { FaExclamationTriangle, FaCheckCircle, FaClock, FaBell } from "react-icons/fa";

const CrimeStats = ({ stats }) => {
  return (
    <div className="container">
      <div className="row g-4" data-aos="fade-up">
        <div className="col-md-3">
          <div className={`${styles.statCard} card shadow-sm h-100`}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className={`${styles.statIcon} ${styles.totalIcon}`}>
                <FaExclamationTriangle />
              </div>
              <h2 className="display-4 fw-bold mb-0 mt-3">{stats.total.toLocaleString()}</h2>
              <p className="text-muted mb-0">Total Crimes</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className={`${styles.statCard} card shadow-sm h-100`}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className={`${styles.statIcon} ${styles.solvedIcon}`}>
                <FaCheckCircle />
              </div>
              <h2 className="display-4 fw-bold mb-0 mt-3">{stats.solved.toLocaleString()}</h2>
              <p className="text-muted mb-0">Solved Cases</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className={`${styles.statCard} card shadow-sm h-100`}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className={`${styles.statIcon} ${styles.pendingIcon}`}>
                <FaClock />
              </div>
              <h2 className="display-4 fw-bold mb-0 mt-3">{stats.pending.toLocaleString()}</h2>
              <p className="text-muted mb-0">Pending Cases</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className={`${styles.statCard} card shadow-sm h-100`}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className={`${styles.statIcon} ${styles.recentIcon}`}>
                <FaBell />
              </div>
              <h2 className="display-4 fw-bold mb-0 mt-3">{stats.recent.toLocaleString()}</h2>
              <p className="text-muted mb-0">Last 24 Hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeStats;