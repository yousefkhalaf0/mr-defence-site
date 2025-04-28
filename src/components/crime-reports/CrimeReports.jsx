// For CrimeReports.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./CrimeReports.module.css";
import { FaSearch, FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import CrimeMap from "./CrimeMap";
import CrimeStats from "./CrimeStats";
import CrimeBreakdown from "./CrimeBreakdown";
import CrimeTrends from "./CrimeTrends.jsx";
import RecentCrimes from "../Home/RecentCrimes"; 

const CrimeReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    solved: 0,
    pending: 0,
    recent: 0
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Anywhere, New York, US");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    const fetchReports = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (reportsData.length > 0) {
          console.log("First report full data:", reportsData[0]);
          console.log("First report occured_location:", reportsData[0].occured_location);
        }
        
        setReports(reportsData);
        
        // Calculate stats
        const solved = reportsData.filter(report => report.status === "solved").length;
        const pending = reportsData.filter(report => report.status === "pending").length;
        
        // Get recent reports from the last 24 hours
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const recent = reportsData.filter(report => 
          report.occured_time?.toDate() >= oneDayAgo).length;
        
        setStats({
          total: reportsData.length,
          solved,
          pending,
          recent
        });
        
      } catch (error) {
        console.error("Error fetching reports: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);



  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={` py-4 ${styles.crimeReports}`}>
      <div className={styles.headerBanner}>
        <h1 className={`text-white mb-0 `}>Crime Reports Of <span className="text-danger">2023</span> </h1>
      </div>
      
  
      
      {/* Stats Section */}
      <CrimeStats stats={stats} />
      
      {/* Map Section */}
      <div className="container mt-5" data-aos="fade-up">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h3 className="mb-0">Crime Density Map</h3>
          </div>
          <div className="card-body p-0">
            <CrimeMap reports={reports} />
          </div>
        </div>
      </div>
      
      {/* Crime Breakdown */}
      <div className="container mt-5" data-aos="fade-up" data-aos-delay="100">
        <div className="card shadow-sm">
          <div className="card-header bg-white ">
            <h3 className="py-4 text-center h1">Detailed Crime Breakdown</h3>
           
          </div>
          <div className="card-body">
            <CrimeBreakdown reports={reports} />
          </div>
        </div>
      </div>
      
      {/* Crime Trends */}
      <div className="container mt-5" data-aos="fade-up" data-aos-delay="200">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h3 className="mb-0">Crime Trends (2021-2023)</h3>
          </div>
          <div className="card-body">
            <CrimeTrends />
          </div>
        </div>
      </div>
      
      {/* Recent Crimes Section */}
      <div className="mt-5" data-aos="fade-up" data-aos-delay="300">
        <RecentCrimes limit={5} />
      </div>
    </div>
  );
};

export default CrimeReports;