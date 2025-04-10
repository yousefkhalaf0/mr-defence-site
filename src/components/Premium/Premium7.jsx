import React from 'react'
import './Premium.css'

export default function Premium7() {
  return (
    <>
      <div className="emergency py-5">
        <div className="container">
          <div className="row g-lg-5 g-3 align-items-center justify-content-center">
            <div className="col-lg-6 text-light">
              <h4 className="fw-bold mb-3">Emergency Response</h4>
              <p className="fs-5 mb-4">
                We'll help you connect to first responders for expert advice and evacuation support:
              </p>
              <ul className="list-unstyled">
                <li>Emergency dispatch</li>
                <li>Natural disasters</li>
                <li>Emergency evacuation</li>
                <li>Active shooter events</li>
                <li>Disease outbreak advice and assistance</li>
                <li>Emergency medical response connection</li>
                <li>Monitoring during a medical emergency</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <img
                src="/imgs/emergency-response.jpeg"
                alt="emergency response"
                className="w-100 rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

