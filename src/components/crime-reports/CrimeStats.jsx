// CrimeStats.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./CrimeStats.module.css";
import { FaHome } from "react-icons/fa";

const CrimeStats = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: { current: 0, previous: 0, change: 0 },
    violent: { current: 0, previous: 0, change: 0 },
    property: { current: 0, previous: 0, change: 0 },
    other: { current: 0, previous: 0, change: 0 }
  });
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  
  // Use fixed years as in the design
  const currentYear = 2025;
  const previousYear = 2024;

  // Extract unique regions from location data
  const extractRegions = (reportsList) => {
    const regionSet = new Set();
    
    reportsList.forEach(report => {
      if (report.location_name) {
        // Extract region from location_name
        const locationParts = report.location_name.split(',');
        if (locationParts.length > 0) {
          regionSet.add(locationParts[0].trim());
        }
      }
    });
    
    return ["All", ...Array.from(regionSet)].sort();
  };

  // Helper function to determine crime category based on emergency_type
  const getCrimeCategory = (emergencyType) => {
    if (!emergencyType) return "other";
    
    const type = typeof emergencyType === 'string' ? emergencyType.toLowerCase() : '';
    
    // Violent crimes
    if (
      type.includes("assault") ||
      type.includes("fight") ||
      type.includes("gun") ||
      type.includes("weapon") ||
      type.includes("harassment") ||
      type.includes("violence")
    ) {
      return "violent";
    }
    
    // Property crimes
    if (
      type.includes("robbery") ||
      type.includes("theft") ||
      type.includes("break in") ||
      type.includes("burglary") ||
      type.includes("vandalism")
    ) {
      return "property";
    }
    
    return "other";
  };

  // Filter reports by selected region
  const filterByRegion = (allReports, region) => {
    if (region === "All") return allReports;
    
    return allReports.filter(report => {
      if (!report.location_name) return false;
      return report.location_name.includes(region);
    });
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get all reports to extract regions (using a reasonable limit)
        const allReportsQuery = query(
          collection(db, "reports"),
          orderBy("occured_time", "desc"),
          limit(1000) // Use a reasonable limit to get location data
        );
        
        const allReportsSnapshot = await getDocs(allReportsQuery);
        const allReports = allReportsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Extract unique regions
        const extractedRegions = extractRegions(allReports);
        setRegions(extractedRegions);
        
        // Create date objects for year filtering
        const currentYearStart = new Date(`${currentYear}-01-01T00:00:00`);
        const currentYearEnd = new Date(`${currentYear}-12-31T23:59:59`);
        const previousYearStart = new Date(`${previousYear}-01-01T00:00:00`);
        const previousYearEnd = new Date(`${previousYear}-12-31T23:59:59`);
        
        // Filter reports by year
        const currentYearReports = allReports.filter(report => {
          if (!report.occured_time) return false;
          const reportDate = report.occured_time.toDate ? report.occured_time.toDate() : new Date(report.occured_time);
          return reportDate >= currentYearStart && reportDate <= currentYearEnd;
        });
        
        const previousYearReports = allReports.filter(report => {
          if (!report.occured_time) return false;
          const reportDate = report.occured_time.toDate ? report.occured_time.toDate() : new Date(report.occured_time);
          return reportDate >= previousYearStart && reportDate <= previousYearEnd;
        });
        
        // Filter by selected region
        const filteredCurrentReports = filterByRegion(currentYearReports, selectedRegion);
        const filteredPreviousReports = filterByRegion(previousYearReports, selectedRegion);
        
        // Set reports for UI display
        setReports(filteredCurrentReports);
        
        // Calculate stats for current year
        const totalCurrent = filteredCurrentReports.length;
        let violentCurrent = 0;
        let propertyCurrent = 0;
        let otherCurrent = 0;

        filteredCurrentReports.forEach(report => {
          const category = getCrimeCategory(report.emergency_type);
          if (category === "violent") violentCurrent++;
          else if (category === "property") propertyCurrent++;
          else otherCurrent++;
        });

        // Calculate stats for previous year
        const totalPrevious = filteredPreviousReports.length;
        let violentPrevious = 0;
        let propertyPrevious = 0;
        let otherPrevious = 0;

        filteredPreviousReports.forEach(report => {
          const category = getCrimeCategory(report.emergency_type);
          if (category === "violent") violentPrevious++;
          else if (category === "property") propertyPrevious++;
          else otherPrevious++;
        });
        
        // Calculate percentage changes
        const calculateChange = (current, previous) => {
          if (previous === 0) return current > 0 ? 100 : 0;
          return ((current - previous) / previous) * 100;
        };

        setStats({
          total: { 
            current: totalCurrent, 
            previous: totalPrevious, 
            change: calculateChange(totalCurrent, totalPrevious)
          },
          violent: { 
            current: violentCurrent, 
            previous: violentPrevious, 
            change: calculateChange(violentCurrent, violentPrevious)
          },
          property: { 
            current: propertyCurrent, 
            previous: propertyPrevious, 
            change: calculateChange(propertyCurrent, propertyPrevious)
          },
          other: { 
            current: otherCurrent, 
            previous: otherPrevious, 
            change: calculateChange(otherCurrent, otherPrevious)
          }
        });

      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to fetch crime reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [selectedRegion, currentYear, previousYear]);

  // Format the change value
  const formatChange = (change) => {
    if (change > 0) return `+${change.toFixed(1)}%`;
    if (change < 0) return `${change.toFixed(1)}%`;
    return '0%';
  };

  // Get color based on change direction
  const getChangeColor = (change, isViolent = false) => {
    // For violent crimes, negative is good
    if (isViolent) {
      return change < 0 ? 'text-success' : change > 0 ? 'text-danger' : '';
    }
    return change > 0 ? 'text-success' : change < 0 ? 'text-danger' : '';
  };

  return (
    <div className="m-0 p-0">
      {/* Top Blue Header Bar - Exactly like the image */}
      <div className={` text-white px-4 py-4 d-flex justify-content-between align-items-center`} style={{ backgroundColor: '#3C4F5D' }}>
        <h5 className="m-0">Crime Reports of {currentYear}</h5>
        <small>as of {new Date().toLocaleDateString()}</small>
      </div>
      
      <div className="container-fluid px-5">
        {/* Light Gray Navigation Bar - Exactly like the image */}
      <div className=" px-4 py-2  ">
        
        {/* Region Selector Dropdown */}
        <select 
          className={`form-select form-select-sm  ${styles.select}`}
          style={{ width: 'auto', minWidth: '250px' }}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          aria-label="Select region"
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}  
      {error && (
        <div className="alert alert-danger mx-4 mt-3 mb-0" role="alert">
          {error}
        </div>
      )}

      {/* Stats Cards - Using exact layout from image */}
      {loading ? (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4 p-4 ">
          {/* Total Reports Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-lg border-primary h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Reports {selectedRegion !== "All" ? selectedRegion : ""}</h6>
                <h2 className="display-4 fw-bold mb-1">{stats.total.current.toLocaleString()}</h2>
                <div className="d-flex justify-content-center align-items-center">
                  <span className={`small ${getChangeColor(stats.total.change)}`}>
                    {formatChange(stats.total.change)}
                  </span>
                  <span className="text-muted small ms-2">vs {previousYear}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Violent Crimes Card */}
          <div className="col-md-6 col-lg-3 ">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Violent Crimes</h6>
                <h2 className="display-4 fw-bold mb-1">{stats.violent.current.toLocaleString()}</h2>
                <div className="d-flex justify-content-center align-items-center">
                  <span className={`small ${getChangeColor(stats.violent.change, true)}`}>
                    {formatChange(stats.violent.change)}
                  </span>
                  <span className="text-muted small ms-2">vs {previousYear}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Crimes Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Property Crimes</h6>
                <h2 className="display-4 fw-bold mb-1">{stats.property.current.toLocaleString()}</h2>
                <div className="d-flex justify-content-center align-items-center">
                  <span className={`small ${getChangeColor(stats.property.change)}`}>
                    {formatChange(stats.property.change)}
                  </span>
                  <span className="text-muted small ms-2">vs {previousYear}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other Incidents Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-lg   h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Other Incidents</h6>
                <h2 className="display-4 fw-bold mb-1">{stats.other.current.toLocaleString()}</h2>
                <div className="d-flex justify-content-center align-items-center">
                  <span className={`small ${getChangeColor(stats.other.change)}`}>
                    {formatChange(stats.other.change)}
                  </span>
                  <span className="text-muted small ms-2">vs {previousYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CrimeStats;