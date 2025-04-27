import React, { useEffect, useState } from 'react';
import {
  FaShieldAlt,
  FaFireExtinguisher,
  FaFirstAid,
  FaHandsHelping,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { WiDayStormShowers } from 'react-icons/wi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import './Tutorial.css';

const iconMap = {
  FaShieldAlt: FaShieldAlt,
  FaFireExtinguisher: FaFireExtinguisher,
  WiDayStormShowers: WiDayStormShowers,
  FaFirstAid: FaFirstAid,
  FaHandsHelping: FaHandsHelping
};

const categoryColors = {
  1: '#E63946',
  2: '#457B9D',
  3: '#F4A261',
  4: '#2A9D8F',
  5: '#264653'
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch main categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tutorials'));
        const loadedCategories = [];

        querySnapshot.forEach((doc) => {
          loadedCategories.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setCategories(loadedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch tutorials when a category is selected
  useEffect(() => {
    const fetchTutorials = async () => {
      if (!selectedCategory) return;

      try {
        setLoading(true);
        const tutorialsRef = collection(db, 'tutorials', selectedCategory.id, 'tutorials');
        const querySnapshot = await getDocs(tutorialsRef);

        const loadedTutorials = [];
        querySnapshot.forEach((doc) => {
          loadedTutorials.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setTutorials(loadedTutorials);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tutorials:", err);
        setError('Failed to load tutorials. Please try again.');
        setLoading(false);
      }
    };

    fetchTutorials();
  }, [selectedCategory]);

  // Pagination
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);
  const totalPages = Math.ceil(tutorials.length / tutorialsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) {
    return (
      <div className="tutorials-container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tutorials-container text-center py-5 text-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="tutorials-container py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Explore Our Tutorials</h2>

        {!selectedCategory ? (
          <div className="row g-4">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || FaShieldAlt;
              return (
                <motion.div
                  className="col-lg-4 col-md-6"
                  key={category.id}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="category-card"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="category-icon">
                      <Icon style={{ color: categoryColors[category.id.split('_')[1]] }} />
                    </div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            className="tutorials-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="back-button"
              onClick={() => {
                setSelectedCategory(null);
                setTutorials([]);
                setCurrentPage(1);
              }}
            >
              <FaChevronLeft /> Back to Categories
            </button>

            <div className="category-header p-4 text-center shadow-sm" style={{ marginBottom: '2rem' }}>
              <div className="category-title" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                gap: '1rem',
                marginBottom: '0.5rem'
              }}>
                <div
                  className="category-icon-lg"
                  style={{
                    backgroundColor: categoryColors[selectedCategory.id.split('_')[1]],
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {React.createElement(iconMap[selectedCategory.icon], {
                    style: {
                      color: 'white',
                      fontSize: '1.25rem'
                    }
                  })}
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>{selectedCategory.title}</h2>
              </div>
              <p className="category-description" style={{
                margin: 0,
                color: '#666',
                lineHeight: 1.6,
                textAlign: 'center',
                paddingLeft: 'calc(200px + 1rem)'   
              }}>
                {selectedCategory.description}
              </p>
            </div>

            {tutorials.length === 0 ? (
              <div className="no-tutorials">
                <p>No tutorials available for this category.</p>
              </div>
            ) : (
              <>
                <div className="tutorials-grid">
                  {currentTutorials.map((tutorial) => (
                    <motion.div
                      className="tutorial-card"
                      key={tutorial.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="card-image-container">
                        <img
                          src={tutorial.thumbnail}
                          alt={tutorial.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x180?text=Thumbnail+Not+Available';
                          }}
                        />
                        <div className="card-overlay">
                          <a
                            href={tutorial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-button"
                          >
                            View {tutorial.type === 'video' ? 'Video' : 'Article'}
                          </a>
                        </div>
                      </div>
                      <div className="card-content">
                        <h4>{tutorial.title}</h4>
                        <p>{tutorial.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container">
                    <button
                      className="pagination-button"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </button>

                    <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          className={`page-number ${currentPage === number ? 'active' : ''}`}
                          onClick={() => changePage(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    <button
                      className="pagination-button"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}