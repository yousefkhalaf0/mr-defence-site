import React from 'react';
import './Premium.css';   

const Premium8 = () => {
  return (
    <footer className="citizen-footer bg-dark text-center text-white pt-5 pb-4">
      <div className="container">
        <div className="row p-4 mb-4">
          {/* Logo Section */}
          <div className="col-lg-3 mb-4 mb-lg-0 align-items-center d-flex">
            <img src="/imgs/Frame 22.jpg" className="logo "/>
            <h2 className="citizen-logo fw-bold ps-3 mb-0">mr.defence</h2>
          </div>
          
          {/* Links Sections */}
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0">
                <h5 className="footer-heading mb-3">COMPANY</h5>
                <ul className="list-unstyled footer-links">
                  <li className="mb-2"><a href="#careers" className="text-decoration-none">Careers</a></li>
                  <li className="mb-2"><a href="#mission" className="text-decoration-none">Mission</a></li>
                  <li className="mb-2"><a href="#premium" className="text-decoration-none">Premium</a></li>
                  <li className="mb-2"><a href="#explore" className="text-decoration-none">Explore</a></li>
                  <li className="mb-2"><a href="#press" className="text-decoration-none">Press</a></li>
                </ul>
              </div>
              
              <div className="col-md-6">
                <h5 className="footer-heading mb-3">SUPPORT</h5>
                <ul className="list-unstyled footer-links">
                  <li className="mb-2"><a href="#support" className="text-decoration-none">Support</a></li>
                  <li className="mb-2"><a href="#privacy" className="text-decoration-none">Privacy</a></li>
                  <li className="mb-2"><a href="#terms" className="text-decoration-none">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Empty column for spacing */}
          <div className="col-lg-3"></div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom row pt-3 mt-3">
          <div className="col-md-6 mb-3 fw-bolder mb-md-0">
            <span className="copyright d-block d-md-inline me-3">© mr.defence 2025</span>
            <a href="#cookies" className="cookie-link text-decoration-none">Manage Cookie Preferences</a>
          </div>
          
           
        </div>
      </div>
    </footer>
  );
};

export default Premium8;