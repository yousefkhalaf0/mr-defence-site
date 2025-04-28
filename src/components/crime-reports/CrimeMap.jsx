import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./CrimeMap.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CrimeMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCrimeType, setSelectedCrimeType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");
  const [maxIntensity, setMaxIntensity] = useState(0);
  const [minIntensity, setMinIntensity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const reportsCollection = collection(db, "reports");
        const reportSnapshot = await getDocs(reportsCollection);
        
        const locations = reportSnapshot.docs.map((doc) => {
          const data = doc.data();
          const location = data.occured_location; // Note the double 'r'
          const time = data.occured_time?.toDate?.() || new Date();

          if (location) {
            let intensity = 0.5;

            switch (data.emergency_type.toLowerCase()) {
              case "fire":
              case "wildfire":
                intensity = 0.7;
                break;
              case "killing":
              case "assault/fight":
                intensity = 1.0;
                break;
              case "robbery crime":
              case "robbery/theft":
                intensity = 0.6;
                break;
              case "property crime":
              case "break in":
                intensity = 0.5;
                break;
              case "collision":
              case "accident":
                intensity = 0.8;
                break;
              default:
                intensity = 0.5;
                break;
            }

            return {
              lat: location.latitude,
              lng: location.longitude,
              intensity,
              type: data.emergency_type,
              area: data.location_name,
              time,
            };
          }
          return null;
        }).filter(Boolean);

        if (locations.length > 0) {
          const intensities = locations.map((loc) => loc.intensity);
          setMaxIntensity(Math.max(...intensities));
          setMinIntensity(Math.min(...intensities));
        }

        setHeatmapData(locations);
        setFilteredData(locations);

        const uniqueCrimeTypes = [...new Set(locations.map(l => l.type))];
        const uniqueAreas = [...new Set(locations.map(l => l.area))];
        setCrimeTypes(uniqueCrimeTypes);
        setAreas(uniqueAreas);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedCrimeType, selectedArea, selectedTimePeriod, heatmapData]);

  const filterData = () => {
    let filtered = [...heatmapData];

    if (selectedCrimeType) {
      filtered = filtered.filter(item => 
        item.type.toLowerCase() === selectedCrimeType.toLowerCase()
      );
    }

    if (selectedArea) {
      filtered = filtered.filter(item => 
        item.area.toLowerCase().includes(selectedArea.toLowerCase())
      );
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

  const getEmojiForCrimeType = (type) => {
    if (!type) return "⚠️";
    
    switch (type.toLowerCase()) {
      case "fire":
        return "🔥";
      case "collision":
      case "accident":
        return "💥";
      case "missing pet":
        return "🐾";
      case "animal attack":
        return "🐅";
      case "gun":
        return "🔫";
      case "break in":
        return "🚪";
      case "assault":
      case "assault/fight":
        return "🥊";
      case "harassment":
        return "⚠️";
      case "earthquake":
        return "🌍";
      case "hazard":
        return "☣️";
      case "missing person":
        return "👤";
      case "robbery":
      case "robbery/theft":
      case "robbery crime":
        return "🏃‍♀️";
      case "weapon":
        return "🗡️";
      case "weather":
        return "🌧️";
      case "wildfire":
        return "🔥";
      default:
        return "⚠️";
    }
  };

  const gradient = {
    0.0: "blue",
    0.2: "green",
    0.4: "yellow",
    0.6: "orange",
    0.8: "red",
    1.0: "darkred",
  };

  if (loading) {
    return <div className={`container ${styles.crimeMapContainer}`}>Loading crime data...</div>;
  }

  return (
    <div className={`container ${styles.crimeMapContainer}`} data-aos="fade-up">
      

      <div className={`row ${styles.filters}`} data-aos="fade-up">
        <div className="col-md-4 mb-3">
          <select 
            className="form-select" 
            onChange={(e) => setSelectedCrimeType(e.target.value)} 
            value={selectedCrimeType}
          >
            <option value="">All Crime Types</option>
            {crimeTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select 
            className="form-select" 
            onChange={(e) => setSelectedTimePeriod(e.target.value)} 
            value={selectedTimePeriod}
          >
            <option value="">All Time</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select 
            className="form-select" 
            onChange={(e) => setSelectedArea(e.target.value)} 
            value={selectedArea}
          >
            <option value="">All Areas</option>
            {areas.map((area, idx) => (
              <option key={idx} value={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={`position-relative ${styles.mapWrapper}`}>
        <MapContainer
          className={styles.mapContainer}
          center={[26.8206, 30.8025]}
          zoom={6}
          minZoom={2}
          style={{ height: "450px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredData.length > 0 && (
            <HeatmapLayer
              points={filteredData.map(p => [p.lat, p.lng, p.intensity])}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => m[2]}
              gradient={gradient}
              radius={25}
              blur={15}
            />
          )}

          {filteredData.map((point, idx) => (
            <Marker key={idx} position={[point.lat, point.lng]}>
              <Popup>
                <div style={{ fontSize: "20px" }}>
                  {getEmojiForCrimeType(point.type)} <br />
                  <strong>Area:</strong> {point.area || "Unknown"} <br />
                  <strong>Type:</strong> {point.type || "Unknown"} 
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className={`p-3 ${styles.legend}`}>
          <h5>Crime Density</h5>
          <div>
            <span className={`${styles.dot} ${styles.low}`}></span> Low
          </div>
          <div>
            <span className={`${styles.dot} ${styles.medium}`}></span> Medium
          </div>
          <div>
            <span className={`${styles.dot} ${styles.high}`}></span> High
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeMap;