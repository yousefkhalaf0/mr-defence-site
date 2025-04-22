import React, { useEffect,useState } from 'react';
import styles from './Home.module.css';
import Carousel from '../About/Carousel';
import RecentCrimes from './RecentCrimes.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const [showFullText, setshowFullText] = useState(false);
  const fullText=`In our shared mission to enhance community safety, collaboration is key. 
  By working together, residents, law enforcement, and local organizations can create a proactive approach to crime prevention.
  Our platform encourages open communication and reporting, empowering everyone to contribute to a safer environment.
  With access to real-time data and resources, community members can stay informed about potential risks.
  Together, we can build a resilient community that prioritizes safety and well-being.
  Join us in fostering a culture of vigilance and support, where everyone plays a role in keeping our neighborhoods secure.`;
  const shortText=`
  In our shared mission to enhance community safety, collaboration is key. 
  By working together, residents, law enforcement, and local organizations can create a proactive approach to crime prevention...
  `


  // feedback section
  const feedbacks = [
    {
      title: 'Robbery Incident Reported',
      message:
        'I witnessed the incident and immediately contacted the authorities. We need to work together to increase neighborhood watch programs to prevent further occurrences.',
      name: 'Anonymous',
    },
    {
      title: 'Snatching Incident on Main...',
      message:
        'This is alarming! We should organize a community meeting to discuss safety measures and possibly install more street lights in the area.',
      name: 'Anonymous',
    },
    {
      title: 'Addressing Gang Rape',
      message:
        'This is a devastating incident that requires urgent action. We must support the victims and advocate for stronger community support services and educational programs.',
      name: 'Anonymous',
    },
  ];
  return (



    <>

    {/* hero section */}
      <section className={`position-relative text-white ${styles.heroSection}`}>
        <div className={`position-absolute top-0 start-0 w-100 h-100 ${styles.overlay}`}></div>

        <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative z-1 text-center">
          <h1 className="fw-bold mb-3" data-aos="fade-up">
            Report, Track, Prevent – For a Safer Tomorrow
          </h1>
          <p className="lead mb-5" data-aos="fade-up" data-aos-delay="200">
            Safeguarding Together: Your Bridge to a Secure Environment
          </p>

          <div className="row text-center g-5">
            <div className={`col-md-4 mb-4 ${styles.lest}`} data-aos="zoom-in" data-aos-delay="300">
              <div className="d-flex align-items-center justify-content-between">
                <img src="icons/bagg.svg" alt="" />
                <div>   <h6>25,850</h6>
                  <p className=' text-secondary'>Cases</p></div>

              </div>
            </div>
            <div className={`col-md-4 mb-4 ${styles.lest}`} data-aos="zoom-in" data-aos-delay="500">
              <div className="d-flex align-items-center justify-content-between">
                <img src="icons/users.svg" alt="" />

                <div>
                  <h6>10,250</h6>
                  <p className=' text-secondary'>People</p>
                </div>
              </div>
            </div>
            <div className={`col-md-4 mb-4 ${styles.lest}`} data-aos="zoom-in" data-aos-delay="700">
              <div className="d-flex align-items-center justify-content-between">
                <img src="icons/building.svg" alt="" />             <div className=''> <h6>18,400</h6>
                  <p className=' text-secondary text-nowrap ps-4'>Areas Located</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RecentCrimes section */}
      <section className={`${styles.RecentCrimes}`}>
         <RecentCrimes/>
      </section>
     

      {/* Enhancing section */}
      <div className={`container-fluid ${styles.enhancing}`}>
  <div className="row g-5 d-flex align-items-center py-5 m-0">
    <div
      className="col-md-6"
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <img src="/imgs/homeEnhancing.png" className="w-100" alt="Enhancing" />
    </div>

    <div
      className="col-md-6"
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <h1>
        <span className="">Enhancing</span> Community Safety Together
      </h1>
      <p>{showFullText ? fullText : shortText}</p>
      <div className="d-flex gap-3 align-items-center mt-3">
        <button className="btn btn-danger" data-aos="zoom-in"  data-aos-delay="300">
          Search crime
        </button>
        <p
          className={`text-danger pt-3 ${styles.textp}`}
          onClick={() => {
            setshowFullText(!showFullText);
          }}
         
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          {showFullText ? "Show Less" : "Learn More"}{" "}
          <i className={`fas ${showFullText ? "fa-angle-up" : "fa-angle-down"}`}></i>
        </p>
      </div>
    </div>
  </div>

  <hr className="px-5 text-danger" />

  <div
    className={`row text-center py-3 ${styles.numbers}`}
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-delay="300"
  >
    <div className="col-4">
      <h1>12+</h1>
      <h5>Crime Reporting</h5>
    </div>
    <div className="col-4">
      <h1>200+</h1>
      <h5>Active cases</h5>
    </div>
    <div className="col-4">
      <h1>18+</h1>
      <h5>Crime Areas</h5>
    </div>
  </div>

  <hr className="px-5 text-danger" />
</div>
{/* uniting peaple */}
<section className={`p-5 ${styles.people}`}>
  <div className="row bg-black d-flex align-items-center px-5 ">
    <div className="col-md-4" data-aos="fade-rigth" data-aos-delay="300">
      <h2 className='text-white'>Uniting for Safety: Your Portal to Crime-Free Living</h2>
      <p className='text-secondary'>Insight into Neighborhood Security</p>
      <button className='btn btn-danger'>search crime</button>
    </div>
    <div className="col-md-8" data-aos="fade-left" data-aos-delay="300">
      <img src="imgs/people.png" className='w-100' alt="" />
    </div>
    
  </div>
</section>
{/* feedback section */}
<section className={`${styles.feedback}`}>
<div className="container py-5" >
      <h2 className="text-center fw-bold mb-2">Response From People On Complaints</h2>
      <p className="text-center text-dark mb-4">
        At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id...
      </p>
      <div className="row justify-content-center g-4">
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="col-md-4"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div className={`  ${styles.card} p-3 shadow-sm rounded-4 h-100 bg-white`}>
              <h6 className="fw-bold">{feedback.title}</h6>
              <p className="text-muted small mt-2" style={{ minHeight: '130px' }}>
                {feedback.message}
              </p>
              <div className="d-flex align-items-center justify-content-between mt-auto px-3">
                <div className="d-flex align-items-center gap-2">
                  <div className={`${styles.profilePlaceholder} rounded-circle border-1 border-danger `}></div>
                  <span className="fw-semibold small">{feedback.name}</span>
                </div>
                <i class="fa-solid fa-quote-left fs-1 text-danger"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
</section>
{/* blog section */}
<section className={`pb-3 pt-5 ${styles.blog}`}>
  <div className='text-center pb-3'>
    <h1 data-aos="fade-up" data-aos-delay="200">News and Blog Of Recent Crimes</h1>
    <h6 data-aos="fade-up" data-aos-delay="300">Crime in Karachi: What’s Happening Now?</h6>
  </div>
  <Carousel/>
</section>


    </>
  );
};

export default Home;
