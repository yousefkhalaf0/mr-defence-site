
import React ,  {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Explore.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
   
const Explore = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <div className="explore-container mt-5">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
      <div className="container-fluid">
        {/* Community icon with animation */}
        <div className="mb-4" data-aos="fade-down" data-aos-delay="100">
          <i className="fas fa-users fa-3x text-danger" style={{
            animation: 'pulse 2s infinite'
          }}></i>
        </div>
        
        <h1 className="display-5 fw-bold mb-3" 
            data-aos="fade-up" 
            data-aos-delay="200">
          Community Safety Network
        </h1>
        
        <p className="lead mb-4 text-muted mx-auto" 
           style={{ maxWidth: '600px', lineHeight: '1.6' }}
           data-aos="fade-up" 
           data-aos-delay="300">
          Stay informed about local safety updates and neighborhood watch reports
        </p>
        
        {/* Incident type indicators */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <span className="badge bg-light text-dark p-2" 
                data-aos="zoom-in" 
                data-aos-delay="400">
            <i className="fas fa-car-crash me-1 text-danger"></i> Traffic Incidents
          </span>
          <span className="badge bg-light text-dark p-2" 
                data-aos="zoom-in" 
                data-aos-delay="450">
            <i className="fas fa-exclamation-triangle me-1 text-warning"></i> Safety Alerts
          </span>
          <span className="badge bg-light text-dark p-2" 
                data-aos="zoom-in" 
                data-aos-delay="500">
            <i className="fas fa-home me-1 text-primary"></i> Neighborhood Watch
          </span>
          <span className="badge bg-light text-dark p-2" 
                data-aos="zoom-in" 
                data-aos-delay="550">
            <i className="fas fa-lightbulb me-1 text-info"></i> Safety Tips
          </span>
        </div>
        
        {/* Last updated information */}
        <div className="mt-4 pt-3 small text-light" 
             data-aos="fade-up" 
             data-aos-delay="600">
          <i className="fas fa-clock me-1"></i>
          Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
 

      {/* Main Content Section */}
      <div className="main-content container p-4 p-md-5">
  <div className="row g-4">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="col-lg-4 col-md-6 col-12">
        <div className="card shadow border-1 border-danger h-100 hover-card">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={`https://i.pravatar.cc/100?img=${index + 10}`}
                alt="User"
                className="custom-avatar me-3"
              />
              <div>
                <div className="fw-semibold text-dark">User {index + 1}</div>
                <div className="text-muted small">{index + 2} hours ago</div>
              </div>
            </div>

            <p className="text-secondary mb-3">
              {`This is a sample community safety report about incident #${index + 100} in the neighborhood... `}
              <span className="text-primary fw-medium cursor-pointer">Read more</span>
            </p>

            <img
              src={`https://source.unsplash.com/random/600x400?sig=${index}`}
              alt="Incident"
              className="img-fluid rounded-3 mb-3 hover-zoom"
            />

            <div className="d-flex justify-content-between text-muted small">
              <div>
                <span className="me-3 hover-text-primary">
                  <i className="far fa-thumbs-up me-1"></i> {index + 5}
                </span>
                <span className="me-3 hover-text-primary">
                  <i className="far fa-comment me-1"></i> {index + 2}
                </span>
                <span className="hover-text-primary">
                  <i className="fas fa-share me-1"></i> {index + 1}
                </span>
              </div>
              <div className="hover-text-primary">
                <i className="far fa-eye me-1"></i> {index + 20}.3K
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Statistics Section */}
<div className="statistics-section py-5">
  <div className="container">
    <h2 className="text-center mb-5" data-aos="fade-down">Community Statistics</h2>
    <div className="row text-center g-4">
      {[
        {icon: 'users', value: '10,000+', text: 'Active Members', color: 'primary'},
        {icon: 'map-marked-alt', value: '1,200+', text: 'Covered Locations', color: 'success'}, 
        {icon: 'newspaper', value: '5,400+', text: 'Monthly Posts', color: 'warning'},
        {icon: 'shield-alt', value: '95%', text: 'Alert Accuracy', color: 'danger'}
      ].map((stat, index) => (
        <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
          <div className="p-4 bg-white rounded-3 border border-1 border-danger shadow stat-card h-100">
            <i className={`fas fa-${stat.icon} fa-3x text-${stat.color} mb-3`}></i>
            <h3 className="fw-bold">{stat.value}</h3>
            <p className="text-muted mb-0">{stat.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* How It Works Section */}
<div className="how-it-works py-5">
  <div className="container">
    <h2 className="text-center mb-5" data-aos="fade-down">How It Works</h2>
    <div className="row g-4">
      {[
        {icon: 'bell', title: 'Receive Alerts', text: 'Get instant notifications about incidents in your area', color: 'primary'},
        {icon: 'edit', title: 'Share Info', text: 'Post your experiences to help others in the community', color: 'success'},
        {icon: 'hands-helping', title: 'Join Community', text: 'Interact with others through comments and shares', color: 'info'}
      ].map((step, index) => (
        <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={index*150}>
          <div className="text-center border border-1 border-danger shadow   p-4 h-100 step-card">
            <div className={`icon-wrapper bg-${step.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4`}>
              <i className={`fas fa-${step.icon} fa-2x`}></i>
            </div>
            <h4 className="fw-bold mb-3">{step.title}</h4>
            <p className="text-muted mb-0">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  );
};

export default Explore;
 
