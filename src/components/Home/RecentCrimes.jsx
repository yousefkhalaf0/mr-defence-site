import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./RecentCrimes.module.css";
import { FaBookmark, FaArrowRight } from "react-icons/fa";

const crimes = [
  { year: 2023, status: "updated", areas: "Karachi East, West, South, North" },
  { year: 2022, status: "updated", areas: "Karachi East, West, South, North" },
  { year: 2021, status: "updated", areas: "Karachi East, West, South, North" },
  { year: 2020, status: "24 min ago", areas: "Karachi East, West, South, North" },
  { year: 2019, status: "updated", areas: "Karachi East, West, South, North" },
];

const RecentCrimes = () => {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
        });
      }, []);
      
  return (
    <div className={`container my-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
       <div>
       <h1 className="fw-bold">Recent Crimes Happened</h1>
       <p>Stay informed and vigilant with our comprehensive data</p>
       </div>
        <a href="#" className={`${styles.viewAll}`}>View all</a>
      </div>

      {crimes.map((crime, index) => (
        <div className={` mb-3 p-5 position-relative ${styles.card}`} key={index}
        data-aos="fade-up"
    data-aos-delay={index * 100}>
          <span className={`${styles.badge} `}>{crime.status}</span>

          <div className="d-flex align-items-center">
            <img src="/imgs/hero.jpg" alt="crime icon" className={`me-3 ${styles.crimeIcon}`} />
            <div className="flex-grow-1">
              <h5 className="mb-1">Crime Reports Of {crime.year}</h5>
              <p className="text-muted">{crime.areas}</p>
            </div>
            <button className="btn btn-dark d-flex align-items-center">
              See more <FaArrowRight className="ms-2" />
            </button>
            <FaBookmark className={`${styles.bookmarkIcon}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCrimes;
