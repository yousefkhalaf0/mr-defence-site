import React from 'react';
import img from './about.svg';

export default function About() {
  return (
    <>
    <div className="row text-light w-100 py-5" style={{backgroundImage:""}}>
      <div className="col-md-6">
        <h1 className="text-center">About Us</h1>
        <p className=''>
  Welcome to <strong>mr-defence</strong> — your trusted destination for premium online protection and digital security solutions.  
  We are passionate about empowering individuals and businesses to stay safe in the digital world by providing reliable, easy-to-use tools and expert guidance.  
  At <strong>mr-defence</strong>, we believe that security should be simple, effective, and accessible to everyone.
  <br /><br />
  Whether you're looking to protect your personal data, secure your online identity, or enhance your cybersecurity knowledge,  
  <strong>mr-defence</strong> is here to support you every step of the way.
</p>


      </div>
      <div className="col-md-6">
        <img src={img} alt="about-us"className='w-100'
         />

      </div>
    </div>
    
    </>
  )
}
