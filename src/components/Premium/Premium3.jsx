import React from 'react';
import './Premium.css';

export default function Premium3() {
  return (
    <div className='connected mt-5 text-light'>
      <div className='container p-5'>
        <div className='row align-items-center'>
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img src="/imgs/connectedBG.png" className='w-100 rounded' alt="Connected" />
          </div>

          <div className="col-lg-7">
            <h2 className='fw-bold mb-3 animate-text'>Instantly connect with your agent via video, audio, or messaging 24/7.</h2>
            <p className='fs-5 mb-4'>Connect in the way that works best for you.</p>

            <div className="d-flex flex-column gap-4">
              {/* Card 1 */}
              <div className="info-card d-flex align-items-center gap-4 animate-card">
                <div className="icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-video fs-2"></i>
                </div>
                <div>
                  <h5 className="mb-1">Instant Video</h5>
                  <p className="mb-0">Live video gives critical details about an emergency to better communicate with your agent.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="info-card d-flex align-items-center gap-4 animate-card">
                <div className="icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fs-2 fa-volume-high"></i>
                </div>
                <div>
                  <h5 className="mb-1">Instant Audio</h5>
                  <p className="mb-0">Stay connected to help, even when you can't hold your phone.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="info-card d-flex align-items-center gap-4 animate-card">
                <div className="icon-box">
                  <i className="fa-solid fa-comment fs-2"></i>
                </div>
                <div>
                  <h5 className="mb-1">Instant Messaging</h5>
                  <p className="mb-0">In situations where you can’t speak, or need to be discreet in requesting help.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
