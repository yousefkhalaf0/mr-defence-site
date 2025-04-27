import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import icons from react-bootstrap-icons or similar library
// You'll need to install it: npm install react-bootstrap-icons
import { 
  Bell, Gear, Search, GeoAlt, Telephone, Envelope, Person, 
  Clock, ExclamationTriangle, Check, ChevronDown, ExclamationCircle, 
  Chat, PersonPlus, Pencil, FileText, Clipboard 
} from 'react-bootstrap-icons';

const EmergencyDashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeTab, setActiveTab] = useState('alerts');
  
  // Sample data based on the provided document
  const alerts = [
    {
      id: 'alert1',
      created_at: "April 27, 2025 at 6:31:29 PM UTC+3",
      description: "",
      emergency_type: "notSelected",
      location_name: "الحمراء الثانية, Egypt",
      occurred_location: [27.1722782, 31.1868952],
      occurred_time: "April 27, 2025 at 6:31:29 PM UTC+3",
      pictures: [],
      receiver_guardians: [],
      request_type: "alert",
      status: "pending",
      user_id: "Ska6QbUb6oMQ7SwvbHazzVVXtae2",
      videos: [],
      voice_records: []
    },
    // Additional mock alerts for demonstration
    {
      id: 'alert2',
      created_at: "April 27, 2025 at 5:15:12 PM UTC+3",
      description: "Car accident",
      emergency_type: "accident",
      location_name: "Alexandria, Egypt",
      occurred_location: [31.2001, 29.9187],
      occurred_time: "April 27, 2025 at 5:10:00 PM UTC+3",
      pictures: ["img1.jpg"],
      receiver_guardians: ["guardian1"],
      request_type: "emergency",
      status: "in-progress",
      user_id: "user123",
      videos: [],
      voice_records: []
    },
    {
      id: 'alert3',
      created_at: "April 27, 2025 at 4:22:45 PM UTC+3",
      description: "Medical emergency",
      emergency_type: "medical",
      location_name: "Cairo, Egypt",
      occurred_location: [30.0444, 31.2357],
      occurred_time: "April 27, 2025 at 4:20:00 PM UTC+3",
      pictures: [],
      receiver_guardians: ["guardian2", "guardian3"],
      request_type: "emergency",
      status: "pending",
      user_id: "user456",
      videos: ["video1.mp4"],
      voice_records: []
    }
  ];

  const users = {
    "Ska6QbUb6oMQ7SwvbHazzVVXtae2": {
      birthDate: "27/04/2009",
      bloodType: "",
      createdAt: "April 27, 2025 at 3:47:24 AM UTC+3",
      diabetes: false,
      driverLicense: "",
      email: "malakhaitham2720@gmail.com",
      firstName: "Malak",
      gender: "Female",
      guardians: [],
      heartDisease: false,
      hieght: "",
      homeLocation: null,
      lastName: "Haitham",
      nationality: "Algerian",
      nativeLanguage: "French",
      nid: "",
      passport: "",
      phoneNumber: "+201065016151",
      profileImage: "",
      scar: "",
      tattoo: "",
      weight: "",
      wheelchair: false,
      workLocation: null
    },
    // Additional mock users
    "user123": {
      firstName: "Ahmed",
      lastName: "Mohammed",
      email: "ahmed@example.com",
      phoneNumber: "+201234567890",
      birthDate: "15/08/1985",
      gender: "Male",
      nationality: "Egyptian",
      profileImage: "/api/placeholder/200/200"
    },
    "user456": {
      firstName: "Sara",
      lastName: "Ali",
      email: "sara@example.com",
      phoneNumber: "+201198765432",
      birthDate: "03/12/1990",
      gender: "Female",
      nationality: "Egyptian",
      profileImage: "/api/placeholder/200/200"
    }
  };

  // Calculate age from birthdate
  const calculateAge = (birthDate) => {
    const [day, month, year] = birthDate.split('/');
    const dob = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // Get user details for an alert
  const getUserForAlert = (alert) => {
    return users[alert.user_id];
  };

  // Handle alert selection
  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert);
  };

  // Get Bootstrap color class for status
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'danger';
      case 'in-progress':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-primary text-white p-3 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <ExclamationCircle size={20} className="me-2" />
            <h1 className="h4 mb-0 fw-bold">EmergencyResponse</h1>
          </div>
          <div className="d-flex align-items-center">
            <div className="position-relative me-4">
              <input
                type="text"
                placeholder="Search alerts, users..."
                className="form-control form-control-sm ps-4"
                style={{width: '250px'}}
              />
              <Search size={14} className="position-absolute" style={{left: '10px', top: '8px'}} />
            </div>
            <Bell size={20} className="me-3 cursor-pointer" />
            <Gear size={20} className="me-3 cursor-pointer" />
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-primary-dark d-flex align-items-center justify-content-center me-2" 
                   style={{width: '32px', height: '32px', backgroundColor: '#0056b3'}}>
                <Person size={18} />
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-white shadow-sm" style={{width: '240px'}}>
          <nav className="p-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a 
                  className={`nav-link rounded p-3 ${activeTab === 'dashboard' ? 'bg-light text-primary' : ''}`}
                  href="#"
                  onClick={(e) => {e.preventDefault(); setActiveTab('dashboard')}}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-2" style={{width: '20px', height: '20px'}}>
                      <div className="d-flex flex-wrap" style={{width: '100%', height: '100%'}}>
                        <div style={{width: '50%', height: '50%', backgroundColor: '#0d6efd'}}></div>
                        <div style={{width: '50%', height: '50%', backgroundColor: '#ffc107'}}></div>
                        <div style={{width: '50%', height: '50%', backgroundColor: '#198754'}}></div>
                        <div style={{width: '50%', height: '50%', backgroundColor: '#dc3545'}}></div>
                      </div>
                    </div>
                    <span>Dashboard</span>
                  </div>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a 
                  className={`nav-link rounded p-3 ${activeTab === 'alerts' ? 'bg-light text-primary' : ''}`}
                  href="#"
                  onClick={(e) => {e.preventDefault(); setActiveTab('alerts')}}
                >
                  <div className="d-flex align-items-center">
                    <ExclamationTriangle size={20} className="me-2" />
                    <span>Alerts</span>
                  </div>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a 
                  className={`nav-link rounded p-3 ${activeTab === 'users' ? 'bg-light text-primary' : ''}`}
                  href="#"
                  onClick={(e) => {e.preventDefault(); setActiveTab('users')}}
                >
                  <div className="d-flex align-items-center">
                    <Person size={20} className="me-2" />
                    <span>Users</span>
                  </div>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a 
                  className={`nav-link rounded p-3 ${activeTab === 'reports' ? 'bg-light text-primary' : ''}`}
                  href="#"
                  onClick={(e) => {e.preventDefault(); setActiveTab('reports')}}
                >
                  <div className="d-flex align-items-center">
                    <FileText size={20} className="me-2" />
                    <span>Reports</span>
                  </div>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a 
                  className={`nav-link rounded p-3 ${activeTab === 'settings' ? 'bg-light text-primary' : ''}`}
                  href="#"
                  onClick={(e) => {e.preventDefault(); setActiveTab('settings')}}
                >
                  <div className="d-flex align-items-center">
                    <Gear size={20} className="me-2" />
                    <span>Settings</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Dashboard Area */}
        <main className="flex-grow-1 overflow-auto p-4 bg-light">
          {/* Key Metrics */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-muted">Active Alerts</h6>
                    <ExclamationCircle className="text-danger" />
                  </div>
                  <p className="h3 fw-bold mb-1">7</p>
                  <div className="d-flex fs-6">
                    <span className="text-danger me-3">3 pending</span>
                    <span className="text-warning">4 in progress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-muted">Avg Response Time</h6>
                    <Clock className="text-primary" />
                  </div>
                  <p className="h3 fw-bold mb-1">4.2 min</p>
                  <p className="text-success fs-6 mb-0">↓ 0.8 min from yesterday</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-muted">Daily Reports</h6>
                    <Clipboard className="text-primary" />
                  </div>
                  <p className="h3 fw-bold mb-1">23</p>
                  <p className="text-success fs-6 mb-0">↑ 12% from yesterday</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-muted">Active Users</h6>
                    <Person className="text-primary" />
                  </div>
                  <p className="h3 fw-bold mb-1">78</p>
                  <p className="text-muted fs-6 mb-0">Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Map Placeholder */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Alert Map</h5>
                <div>
                  <button className="btn btn-sm btn-light me-2">Filter</button>
                  <button className="btn btn-sm btn-light">Zoom</button>
                </div>
              </div>
              <div className="bg-secondary bg-opacity-25 rounded position-relative" style={{height: '250px'}}>
                <div className="position-absolute top-50 start-50 translate-middle text-muted">Interactive Map View</div>
                {/* Map Pin for current alert */}
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="position-relative">
                    <GeoAlt size={32} className="text-danger" />
                    <div className="position-absolute bg-white shadow rounded p-2" 
                         style={{width: '180px', top: '-48px', left: '50%', transform: 'translateX(-50%)'}}>
                      <p className="fw-bold mb-1 fs-6">الحمراء الثانية, Egypt</p>
                      <p className="text-muted mb-0 small">[27.1722782° N, 31.1868952° E]</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-muted small">
                <p className="mb-0">Currently showing alert from Malak Haitham at الحمراء الثانية, Egypt</p>
              </div>
            </div>
          </div>

          {/* Alerts Table */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h5 className="card-title mb-0">Active Alerts</h5>
              <div>
                <select className="form-select form-select-sm me-2 d-inline-block" style={{width: 'auto'}}>
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <select className="form-select form-select-sm d-inline-block" style={{width: 'auto'}}>
                  <option>All Types</option>
                  <option>Medical</option>
                  <option>Accident</option>
                  <option>Security</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => {
                    const user = getUserForAlert(alert);
                    return (
                      <tr 
                        key={alert.id} 
                        className={`${selectedAlert?.id === alert.id ? 'table-primary' : ''} cursor-pointer`}
                        onClick={() => handleAlertSelect(alert)}
                        style={{cursor: 'pointer'}}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              className="rounded-circle me-3" 
                              src={user?.profileImage || "/api/placeholder/100/100"} 
                              alt={`${user?.firstName} ${user?.lastName}`}
                              width="40" 
                              height="40"
                              style={{objectFit: 'cover'}}
                            />
                            <div>
                              <div className="fw-medium">{user?.firstName} {user?.lastName}</div>
                              <div className="text-muted small">{user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{new Date(alert.occurred_time).toLocaleTimeString()}</div>
                          <div className="text-muted small">{new Date(alert.occurred_time).toLocaleDateString()}</div>
                        </td>
                        <td>
                          <div>{alert.location_name}</div>
                        </td>
                        <td>
                          <span className={`badge ${
                            alert.emergency_type === 'notSelected' ? 'bg-secondary' : 
                            alert.emergency_type === 'medical' ? 'bg-info' : 
                            alert.emergency_type === 'accident' ? 'bg-warning' : 'bg-primary'
                          }`}>
                            {alert.emergency_type === 'notSelected' ? 'Needs Classification' : alert.emergency_type}
                          </span>
                        </td>
                        <td>
                          <span className={`badge bg-${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button className="btn btn-sm btn-outline-primary me-1">
                              <Telephone size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <Chat size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              <Pencil size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Right Sidebar - User Details */}
        {selectedAlert && (
          <aside className="bg-white shadow-sm overflow-auto" style={{width: '320px'}}>
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Alert Details</h5>
                <button className="btn btn-sm btn-link text-muted">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
            
            {/* Alert Status */}
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted">Status</span>
                <span className={`badge bg-${getStatusColor(selectedAlert.status)}`}>
                  {selectedAlert.status}
                </span>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary w-50">Respond</button>
                <button className="btn btn-light w-50">Assign</button>
              </div>
            </div>

            {/* User Information */}
            {getUserForAlert(selectedAlert) && (
              <div className="p-3 border-bottom">
                <h6 className="text-muted mb-3">User Information</h6>
                <div className="d-flex mb-3">
                  <img 
                    src={getUserForAlert(selectedAlert).profileImage || "/api/placeholder/100/100"} 
                    alt="User" 
                    className="rounded-circle me-3"
                    width="48" 
                    height="48"
                    style={{objectFit: 'cover'}}
                  />
                  <div>
                    <p className="fw-medium mb-0">{getUserForAlert(selectedAlert).firstName} {getUserForAlert(selectedAlert).lastName}</p>
                    <p className="text-muted small mb-0">
                      {getUserForAlert(selectedAlert).gender}, {calculateAge(getUserForAlert(selectedAlert).birthDate)} years old
                      {calculateAge(getUserForAlert(selectedAlert).birthDate) < 18 && (
                        <span className="ms-1 badge bg-warning text-dark">Minor</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Telephone size={16} className="text-muted me-2" />
                    <span>{getUserForAlert(selectedAlert).phoneNumber}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Envelope size={16} className="text-muted me-2" />
                    <span>{getUserForAlert(selectedAlert).email}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <GeoAlt size={16} className="text-muted me-2" />
                    <span>{getUserForAlert(selectedAlert).nationality}</span>
                  </div>
                </div>

                {/* Medical Information */}
                {getUserForAlert(selectedAlert).bloodType !== undefined && (
                  <div className="mt-3">
                    <h6 className="text-muted mb-2">Medical Information</h6>
                    <div className="row g-2">
                      <div className="col-6">
                        <div className="bg-light p-2 rounded small">
                          <span className="text-muted">Blood Type:</span>
                          <span className="ms-1 fw-medium">{getUserForAlert(selectedAlert).bloodType || "Not provided"}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light p-2 rounded small">
                          <span className="text-muted">Diabetes:</span>
                          <span className="ms-1 fw-medium">{getUserForAlert(selectedAlert).diabetes ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light p-2 rounded small">
                          <span className="text-muted">Heart Disease:</span>
                          <span className="ms-1 fw-medium">{getUserForAlert(selectedAlert).heartDisease ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light p-2 rounded small">
                          <span className="text-muted">Wheelchair:</span>
                          <span className="ms-1 fw-medium">{getUserForAlert(selectedAlert).wheelchair ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Location Information */}
            <div className="p-3 border-bottom">
              <h6 className="text-muted mb-3">Location</h6>
              <div className="bg-light p-3 rounded mb-2">
                <p className="fw-medium mb-1">{selectedAlert.location_name}</p>
                <p className="text-muted small mb-0">[{selectedAlert.occurred_location[0]}° N, {selectedAlert.occurred_location[1]}° E]</p>
              </div>
              <p className="text-muted small mb-0">Reported at {new Date(selectedAlert.occurred_time).toLocaleString()}</p>
            </div>

            {/* Alert Media */}
            <div className="p-3 border-bottom">
              <h6 className="text-muted mb-3">Media</h6>
              {(selectedAlert.pictures.length === 0 && 
                selectedAlert.videos.length === 0 && 
                selectedAlert.voice_records.length === 0) ? (
                <p className="text-muted">No media attached to this alert</p>
              ) : (
                <div>
                  {selectedAlert.pictures.length > 0 && (
                    <div className="mb-3">
                      <p className="text-muted small mb-1">Photos ({selectedAlert.pictures.length})</p>
                      <div className="row g-2">
                        {selectedAlert.pictures.map((pic, index) => (
                          <div key={index} className="col-4">
                            <div className="bg-light rounded" style={{height: '64px'}}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedAlert.videos.length > 0 && (
                    <div>
                      <p className="text-muted small mb-1">Videos ({selectedAlert.videos.length})</p>
                      <div className="row g-2">
                        {selectedAlert.videos.map((video, index) => (
                          <div key={index} className="col-6">
                            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{height: '80px'}}>
                              <span className="text-muted small">Video {index + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-3">
              <h6 className="text-muted mb-3">Actions</h6>
              <div className="d-grid gap-2">
                <button className="btn btn-success d-flex align-items-center justify-content-center">
                  <Telephone size={16} className="me-2" />
                  Call User
                </button>
                <button className="btn btn-primary d-flex align-items-center justify-content-center">
                  <Chat size={16} className="me-2" />
                  Send Message
                </button>
                <button className="btn btn-warning d-flex align-items-center justify-content-center">
                  <PersonPlus size={16} className="me-2" />
                  Assign Guardian
                </button>
                <button className="btn btn-light d-flex align-items-center justify-content-center">
                  <Pencil size={16} className="me-2" />
                  Update Status
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default EmergencyDashboard;