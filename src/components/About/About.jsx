import React,{useEffect} from 'react';
import styles from './About.module.css';
import Carousel from './Carousel.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({duration:1000, once:true})
  }, [])
  
  return (
    <>
    <div className="row m-0">
        <div className={`py-5 ${styles.aboutText}`}   
>
          <h1 className="title" data-aos="fade-down"
  data-aos-delay="300">About Us</h1>
        </div>

      </div>
   <div className={` ${styles.about} `}>
    <div className="container-fluid px-5">
        {/* what we dooooooo??? */}

        <div className={`  ${styles.aboutDoing} `}>
        <div className=' row p-5 '>
        <div className="col-4" data-aos="fade-right">
          <h2 className='text-dark'>
            What <span>We Do ?</span>
          </h2>

        </div>
        <div className="col-8" data-aos="fade-left">
          <p className={` ${styles.doingInfo}`}>
            We deliver advanced monitoring solutions for comprehensive crime management.
             Our platform empowers communities with crime data insights,
              enabling proactive crime complaints and responses. 
              Stay ahead of threats and protect your community.

          </p>

        </div>
       
        </div> 
        <div className="col-12 px-5 pb-3">
          <img src="/imgs/about1.png" className='w-100' alt="What we do" />
        </div>
      </div>
      {/* How it works */}
      <div className={` row text-center  ${styles.howItwork}`}>
        <div data-aos="fade-down">
          <h2 > How it works ?</h2>
          <p className='pt-4'>Discover how to effectively use our   to report crimes, respond to incidents, and access valuable crime statistics in Karachi.</p>
        </div>
        <div className="row g-4   ">
        <div className={`col-lg-3  col-md-6 col-12 d-flex `} data-aos="fade-up" data-aos-delay="300">
          <div className={`${styles.card} w-100`}>
<img src="/icons/aboutUser.svg" className='py-4' alt="" />

          <h4>Register or Login</h4>
          <p>
          Create an account or log in to access our features.
          </p>
          <br /><br />
          </div>
          
        </div>
        <div className={`col-lg-3  col-md-6 col-12 d-flex `} data-aos="fade-up" data-aos-delay="500">
          <div className={`${styles.card} w-100`}>
<img src="/icons/reportCrime.png" className='py-4' alt="" />

          <h4>Report a Crime</h4>
          <p>Easily register your complaint and report crimes through our intuitive interface.</p>
        <br />
          </div>
        </div>
        <div className={`col-lg-3  col-md-6 col-12 d-flex `}data-aos="fade-up" data-aos-delay="700">
          <div className={`${styles.card} w-100`}>
  <img src="/icons/briefcase.svg" className='py-4' alt="" />
          <h4  className=''>Response to Crimes</h4>
          <p>Engage with the community by responding to crime reports and sharing information.</p>
          <br />
       
          </div>
         </div>
        <div className={`col-lg-3  col-md-6 col-12 d-flex `}data-aos="fade-up" data-aos-delay="900">
          <div className={`${styles.card} w-100`}>
   <img src="/icons/checkMark.svg" className='py-4' alt="" />
          <h4 className=''>View Crime Statistics</h4>
          <p>Access detailed crime statistics and insights specific to Karachi.</p>
          <br /><br />
       
          </div>
        </div>

        </div>



      </div>
      <div className="row p-5">
  <div className={`col-12  ${styles.about2} w-100`}>
    {/* <img src="/imgs/about2.png" className='w-100 ' alt="What we do" /> */}
    
    
      <h1 data-aos="fade-up" >Good Life Begins With 
        <br />
      A Safe Community</h1>
    
  </div>
</div>
{/* enhancing community */}
<div className={`row d-flex align-items-center ${styles.enhancing}`}>
    <div className="col-md-3 col-6 " data-aos="fade-right" data-aos-delay="300">
      <img src="/imgs/enhance2.png" className='w-100' alt="" />
    </div>
    <div className="col-md-3 col-6 ">
      <img src="/imgs/enhance1.png" className='w-100' alt="" />
      <img src="/imgs/enhance3.png" className='w-100' alt="" />
    </div>
  
  <div className="col-md-6 col-12 ps-lg-4 pt-md-5 pt-lg-0 " data-aos="fade-left" data-aos-delay="300">
    <div>
    <h2>Enhancing Community <br /><span>Safety Together</span></h2>
    <p className='py-2'>In our shared mission to enhance community safety,
       collaboration is key. By working together, residents, law enforcement,
       and local organizations can create a proactive approach to crime prevention. </p>
    </div>
    <div className='row g-4'>
    <div className="col-6 d-flex " data-aos="fade-right" data-aos-delay="300">
      <div className='d-flex justify-content-center align-items-center'>
          <img src="icons/enhance1.svg" alt="" /> 
        <p className='fw-bolder'>Safe & Secure Community</p>
      </div>
      
      </div><div className="col-6 d-flex py-3  " data-aos="fade-left" data-aos-delay="300">
        <div className='d-flex justify-content-center align-items-center'><img src="icons/enhance2.svg" alt="" /> 
        <p className='fw-bolder'>Registering Complaints</p></div>
        
      </div><div className="col-6 d-flex  " data-aos="fade-right" data-aos-delay="500">
        <div className='d-flex justify-content-center align-items-center'>
          <img src="icons/enhance3.svg" alt="" /> 
        <p className='fw-bolder'>Response Optimization</p>
        </div>
        
      </div><div className="col-6 d-flex" data-aos="fade-left" data-aos-delay="500">
        <div className='d-flex justify-content-center align-items-center'>
                 <img src="icons/enhance4.svg" alt="" /> 
        <p className='fw-bolder'>Predictive Policing Solutions</p>
        </div>
 
      </div>
    

    </div>

  </div>
</div>
{/* News and Blog */}

<div className={`${styles.blog} row text-center pt-2`}>
<div data-aos="fade-up" data-aos-delay="300">
          <h2> News and Blog </h2>
         <p className='py-3'>Crime in Karachi: What’s Happening Now?</p>
        </div>
        <Carousel/>


</div>


    </div>
   

    
   </div>

    </>
  );
}
