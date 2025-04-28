import React, { useState, useEffect } from "react";
import styles from "./CrimeBreakdown.module.css";
import { FaSearch } from "react-icons/fa";

const CrimeBreakdown = ({ reports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const [previousYearData, setPreviousYearData] = useState({});

  // Process and aggregate the data
  useEffect(() => {
    if (!reports || !Array.isArray(reports)) return;

    // Group reports by emergency type and area
    const groupedData = {};
    
    reports.forEach(report => {
      const emergencyType = report.emergency_type || "Not specified";
      const area = report.location_name || "Unknown area";
      
      // Create key for grouping
      const key = `${emergencyType}_${area}`;
      
      if (!groupedData[key]) {
        groupedData[key] = {
          type: emergencyType,
          area: area,
          count: 0,
          incidents: []
        };
      }
      
      groupedData[key].count++;
      groupedData[key].incidents.push(report);
    });

    // Convert to array and calculate trends
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    const aggregatedData = Object.values(groupedData).map(group => {
      // Calculate year-over-year change (for demonstration)
      // In a real app, you would fetch last year's data from Firebase
      const changePercentage = ((Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1)).toFixed(1);
      
      return {
        ...group,
        trend: Number(changePercentage), // Store raw number for sorting
        changePercentage: changePercentage, // String for display
        previousYear: lastYear
      };
    });

    setProcessedData(aggregatedData);
  }, [reports]);

  // Filter data based on search term
  const filteredData = processedData.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle export functionality
  const handleExport = () => {
    // Generate CSV data
    const headers = ["Crime Type", "Incidents", "Area", "YOY Change"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => 
        [
          item.type,
          item.count,
          item.area,
          `${item.changePercentage}% from ${item.previousYear}`
        ].join(",")
      )
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `crime_breakdown_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to render trend arrow
  const renderTrendArrow = (trend) => {
    if (trend > 0) {
      return <div className={styles.trendUp}></div>;
    } else if (trend < 0) {
      return <div className={styles.trendDown}></div>;
    } else {
      return <div className={styles.trendNeutral}></div>;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detailed Crime Breakdown</h2>
      
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
        
        <button className={styles.exportButton} onClick={handleExport}>
          Export
        </button>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.crimeTypeHeader}>Crime Type</div>
          <div className={styles.incidentsHeader}>Incidents</div>
          <div className={styles.trendHeader}>Trend</div>
          <div className={styles.areaHeader}>Area</div>
          <div className={styles.changeHeader}>YOY Change</div>
        </div>
        
        <div className={styles.tableBody}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div 
                key={`${item.type}-${item.area}-${index}`} 
                className={`${styles.tableRow} ${index % 2 === 0 ? styles.evenRow : ''}`}
              >
                <div className={styles.crimeType}>{item.type}</div>
                <div className={styles.incidents}>{item.count}</div>
                <div className={styles.trend}>
                  {renderTrendArrow(item.trend)}
                </div>
                <div className={styles.area}>{item.area}</div>
                <div className={`${styles.change} ${item.trend > 0 ? styles.increaseText : item.trend < 0 ? styles.decreaseText : ''}`}>
                  {item.trend > 0 ? '↑' : item.trend < 0 ? '↓' : ''} {Math.abs(item.changePercentage)}% from {item.previousYear}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noDataMessage}>
              No crime records found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrimeBreakdown;