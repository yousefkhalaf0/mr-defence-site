import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Carousel.css";

const items = [
  {
    title: "Lyari gang war criminals among 25 arrested in Karachi",
    badge: "Blog",
    date: "24 Jan",
    img: "/imgs/carousel1.png",
  },
  {
    title: "CCTV footage: Thief uses child as a cover while lifting bike in Karachi",
    badge: "News",
    date:"17 Feb",
    img: "/imgs/carousel2.png",
  },
  {
    title: "Lyari gang war criminals among 25 arrested in Karachi",
    badge: "Blog",
    date: "3 March",
    img: "/imgs/carousel3.jpg",
  },
  {
    title: "CCTV footage: Thief uses child as a cover while lifting bike in Karachi",
    badge: "News",
    date:"5 Nov",
    img: "/imgs/carousel4.jpg",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 1 : 2);

  const handleResize = () => {
    setVisibleCount(window.innerWidth < 768 ? 1 : 2);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const getVisibleItems = () => {
    return Array.from({ length: visibleCount }, (_, i) => items[(index + i) % items.length]);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container my-4 bg-transparent p-5">
      <div className="row gx-3 carousel-items-wrapper">
        {getVisibleItems().map((item, i) => (
          <div key={i} className="col-12 col-md-6">
            <div className="card h-100 bg-transparent border-0 position-relative">
              <div className="position-relative">
                <img
                  src={item.img}
                  className="card-img rounded rounded-4 shdow-lg"
                  alt={item.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                  {item.badge}
                </span>
              </div>
              <div className="card-body text-start">
                <p>{item.date}</p>

                <h6 className="card-title">{item.title}</h6>
                <p className="text-danger">lern more <i className="fas fa-arrow-right"></i></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
