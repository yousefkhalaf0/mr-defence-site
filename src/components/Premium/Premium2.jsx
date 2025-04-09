import React from 'react';
import './Premium.css';  

export default function Premium2() {
  return (
    <div className='container mt-5 video-container'>
      <h2 className='text-center text-light py-4'>24/7 Personal Safety with Protect</h2>
      <div className='video-wrapper position-relative'>
        <video 
          src="https://citizen-site.cdn.prismic.io/citizen-site/17244e7f-e361-4446-835d-6cf0fb2eae45_jogger-loop-desktop.mp4" 
          className='w-100'
          playsInline 
          loop 
          muted 
          autoPlay
        ></video>
        <div className="video-overlay position-absolute bottom-0 start-0 w-100 p-4 animate-slide-up">
          <h3 className='text-white h2'>Live monitoring</h3> 
          <p className='text-white py-3 mx-100 fs-5 mb-0'>Our most used feature. Your Protect agent will live monitor your location, speed and surroundings to detect and respond to danger.</p>
        </div>
      </div>
    </div>
  );
}