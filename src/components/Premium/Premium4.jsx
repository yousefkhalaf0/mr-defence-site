import React from 'react'
import './Premium.css'

export default function Premium4() {
  return (
    <div className="dispatcher">
      <div className="container">
        <div className="row align-items-center gap-5 gap-lg-0">
          <div className="col-lg-6 text-dark">
            <h2 className="fw-bold mb-4">Fast, accurate guidance in any situation.</h2>
            <p className="fs-5">
              With the power of mr defence network,our agents can scan surroundings for active situations and answer questions about incidents.
            </p>
          </div>

          <div className="col-lg-6">
            <img
              src="/imgs/female dispatcher.jpg"
              alt="Dispatcher Woman"
              className="w-100 rounded-4 shadow"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
