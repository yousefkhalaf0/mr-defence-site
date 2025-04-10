import React from "react";
import "./Premium.css";

export default function Premium1() {
  return (
    <>
      <div className="main d-flex text-white justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="premium-text">
                <h1 className="animate-up delay-1">
                  The World's Most Intelligent Personal Safety Service.
                </h1>
                <p className="fs-4 animate-up delay-2">
                  Your Protect Agent Has Your Back In Any Situation.No Matter
                  What.
                </p>
                <div className="d-flex justify-content-start mx-25 align-items-center animate-up delay-3">
                  <p className="fs-4 mb-0">Available on</p>
                  <div className="ms-4">
                    <i className="fa-brands pe-2 fs-4 fa-apple"></i>
                    <i className="fa-brands fs-4 fa-google-play"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
