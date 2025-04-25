import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // عدّل المسار حسب مشروعك
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./RecentCrimes.module.css";
import { FaBookmark, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecentCrimes = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      }
    };

    fetchReports();
  }, []);

  // Helper function to convert location object to string
  const formatLocation = (location) => {
    if (!location) return "Unknown location";
    if (typeof location === "object" && "_lat" in location && "_long" in location) {
      return `lat: ${location._lat.toFixed(4)}, long: ${location._long.toFixed(4)}`;
    }
    if (typeof location === "string") {
      return location;
    }
    return "Unknown location";
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Recent Crimes Happened</h1>
          <p>Stay informed and vigilant with our comprehensive data</p>
        </div>
        <a href="/CrimeReports" className={styles.viewAll}>View all</a>
      </div>

      {reports.map((report, index) => (
        <div
          key={report.id}
          className={`mb-3 p-5 position-relative ${styles.card}`}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <span className={styles.badge}>{report.status}</span>

          <div className="d-flex align-items-center">
            <img
              src={report?.pictures?.[0] || "/imgs/hero.jpg"}
              alt="crime icon"
              className={`me-3 ${styles.crimeIcon}`}
            />
            <div className="flex-grow-1">
              <h5 className="mb-1">{report.emergecy_type || "Unknown Type"}</h5>
              <p className="text-muted">{formatLocation(report.occured_location)}</p>
            </div>
            <button
              className="btn btn-dark d-flex align-items-center"
              onClick={() => navigate(`/CrimeReports/`)}
            >
              See more <FaArrowRight className="ms-2" />
            </button>
            <FaBookmark className={styles.bookmarkIcon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCrimes;
