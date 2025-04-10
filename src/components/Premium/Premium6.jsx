import React from 'react'
import './Premium.css'
export default function Premium6() {
  return (
    <>
      <div className="driving mt-5">
        <div className="container p-5">
            <div className="row align-items-center gx-lg-5 gx-0">
                <div className="col-lg-6">
                    <img src="/imgs/driving-safety.jpeg" alt="Driving" className='w-100 rounded' />
                </div>
                <div className="col-lg-6">
                    <h3>
                    Driving Safety</h3>
                    <p>Connect in the way that works best for you.</p>
                    <div className="d-flex align-items-center py-4 gap-4">
                    <i class="fa-solid fs-2 fa-car-burst"></i>
                    <div>
                          <h4>Detect Crashes</h4>
                          <p>When Protect detects a car crash we’ll send an ambulance, alert your emergency contacts, and stay on the line until help arrives — even if you can’t ask for it.</p>
                    </div>
                    </div>
                    <div className="d-flex align-items-center gap-5">
                    <i class="fa-solid fs-2 fa-road"></i>
                    <div>
                          <h4>Roadside Assistance</h4>
                          <p>Whether it's towing, help with a flat tire or transportation so you can get going, we can help.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    
    </>
  )
}
