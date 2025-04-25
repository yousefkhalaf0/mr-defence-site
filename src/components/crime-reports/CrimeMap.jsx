import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {HeatmapLayer} from "react-leaflet-heatmap-layer-v3";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // عدل المسار حسب مشروعك
import styles from "./CrimeMap.module.css"; // Module CSS
import AOS from "aos";
import "aos/dist/aos.css"; // AOS animations

const CrimeMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCrimeType, setSelectedCrimeType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsCollection = collection(db, "reports");
      const reportSnapshot = await getDocs(reportsCollection);

      const locations = reportSnapshot.docs.map((doc) => {
        const data = doc.data();
        const location = data.occured_location;
        const time = data.occured_time?.toDate?.() || new Date();
        if (location) {
          return {
            lat: location.latitude,
            lng: location.longitude,
            intensity: 0.5,
            type: data.emergecy_type,
            area: data.location_name,
            time,
          };
        } else {
          return null;
        }
      }).filter((loc) => loc !== null);

      setHeatmapData(locations);
      setFilteredData(locations);

      const uniqueCrimeTypes = [...new Set(locations.map(l => l.type))];
      const uniqueAreas = [...new Set(locations.map(l => l.area))];
      setCrimeTypes(uniqueCrimeTypes);
      setAreas(uniqueAreas);
    };

    fetchReports();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedCrimeType, selectedArea, selectedTimePeriod, heatmapData]);

  const filterData = () => {
    let filtered = [...heatmapData];

    if (selectedCrimeType) {
      filtered = filtered.filter(item => item.type === selectedCrimeType);
    }

    if (selectedArea) {
      filtered = filtered.filter(item => item.area === selectedArea);
    }

    if (selectedTimePeriod) {
      const now = new Date();
      filtered = filtered.filter(item => {
        const timeDiff = (now - item.time) / (1000 * 60 * 60 * 24);
        if (selectedTimePeriod === "24h") return timeDiff <= 1;
        if (selectedTimePeriod === "7d") return timeDiff <= 7;
        if (selectedTimePeriod === "30d") return timeDiff <= 30;
        return true;
      });
    }

    setFilteredData(filtered);
  };

  return (
    <div className={`container ${styles.crimeMapContainer}`} data-aos="fade-up">
      <h2 className="text-center mb-4">Crime Density Map</h2>

      <div className={`row ${styles.filters}`} data-aos="fade-up">
        <div className="col-md-4 mb-3">
          <select className="form-select" onChange={(e) => setSelectedCrimeType(e.target.value)} value={selectedCrimeType}>
            <option value="">Crime Type</option>
            {crimeTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select className="form-select" onChange={(e) => setSelectedTimePeriod(e.target.value)} value={selectedTimePeriod}>
            <option value="">Time Period</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select className="form-select" onChange={(e) => setSelectedArea(e.target.value)} value={selectedArea}>
            <option value="">Area</option>
            {areas.map((area, idx) => (
              <option key={idx} value={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={`position-relative ${styles.mapWrapper}`} data-aos="zoom-in">
        <MapContainer center={[27.17, 31.18]} zoom={10} style={{ height: "450px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={filteredData.map(p => [p.lat, p.lng, p.intensity])}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => m[2]}
          />
        </MapContainer>

        {/* Legend */}
        <div className={`p-3 ${styles.legend}`} data-aos="fade-left">
          <h5>Crime Density</h5>
          <div><span className={`${styles.dot} ${styles.low}`}></span> Low</div>
          <div><span className={`${styles.dot} ${styles.medium}`}></span> Medium</div>
          <div><span className={`${styles.dot} ${styles.high}`}></span> High</div>
        </div>
      </div>
    </div>
  );
};

export default CrimeMap;
