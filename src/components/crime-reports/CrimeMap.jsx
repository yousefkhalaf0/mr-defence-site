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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsCollection = collection(db, "reports");
      const reportSnapshot = await getDocs(reportsCollection);
      
      const locations = reportSnapshot.docs.map((doc) => {
        const data = doc.data();
        const location = data.occurred_location;
        const time = data.occurred_time?.toDate?.() || new Date();

        if (location) {
          let intensity = 0.5; 

    switch (data.emergency_type) {
      case "fire":
        intensity = 0.7; 
        break;
      case "killing":
        intensity = 1.0; 
        break;
      case "robbery crime":
        intensity = 0.6; 
        break;
      case "property crime":
        intensity = 0.5; 
        break;
      case "collision":
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
        } else {
          return null;
        }
      }).filter((loc) => loc !== null);

      // حساب الكثافة الأعلى والأدنى بعد تحميل البيانات
      const intensities = locations.map((loc) => loc.intensity);
      setMaxIntensity(Math.max(...intensities));
      setMinIntensity(Math.min(...intensities));

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

  const getEmojiForCrimeType = (type) => {
    switch (type) {
      case "Fire":
        return "🔥";
      case "Collision":
        return "💥";
      case "Missing pet":
        return "🐾";
      case "Animal attack":
        return "🐅";
      case "Gun":
        return "🔫";
      case "Break in":
        return "🚪";
      case "Assault/Fight":
        return "🥊";
      case "Harassment":
        return "⚠️";
      case "Earthquake":
        return "🌍";
      case "Hazard":
        return "☣️";
      case "Missing person":
        return "👤";
      case "Robbery/Theft":
        return "🏃‍♀️";
      case "Weapon":
        return "🗡️";
      case "Weather":
        return "🌧️";
      case "Wildfire":
        return "🔥";
      default:
        return "⚠️"; 
     
    }
  };
  // const gradient = {
  //   0.0: "blue",
  //   0.2: "green",
  //   0.4: "yellow",
  //   0.6: "orange",
  //   0.8: "red",
  //   1.0: "darkred",
  // };

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

      <div className={`position-relative ${styles.mapWrapper}`}>
        <MapContainer
          className={`${styles.mapContainer}`}
          center={[26.8206, 30.8025]}
          zoom={6}
          minZoom={2}
          style={{ height: "450px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <HeatmapLayer
            points={filteredData.map(p => [p.lat, p.lng, p.intensity])}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => m[2]}
            // gradient={gradient}
          />

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

        {/* Legend */}
        <div className={`p-3 ${styles.legend}`}>
          <h5>Crime Density</h5>
          <div>
            <span className={`${styles.dot} ${styles.low}`}></span> 
            {/* Low: {minIntensity.toFixed(2)} */} Low
          </div>
          <div>
            <span className={`${styles.dot} ${styles.medium}`}></span> 
           Medium {/* : {((minIntensity + maxIntensity) / 2).toFixed(2)} */}
          </div>
          <div>
            <span className={`${styles.dot} ${styles.high}`}></span> 
            High{/* : {maxIntensity.toFixed(2)} */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CrimeMap;
