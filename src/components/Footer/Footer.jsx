import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (< >
  <div div className={`${styles.footer} pt-3`}>
       <div className="container">
       <div className="row">
       
       <div className="col-md-4">
          <i className='fas fa-home fs-5'></i>
      </div>
      <div className="col-md-4">
        <h3>
          <h4>our Compony</h4>
        </h3>

      </div>
      <div className="col-md-4">
      <h4>our support</h4>


      </div>
      <p 
  className='text-light m-1'
  
>
  all rights reserved @ mr-defence 2025
</p>


       </div>
       </div>
  </div>
    
  
  </>
  )
}
