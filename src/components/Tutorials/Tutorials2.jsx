import React, { useEffect, useState } from 'react';
import data from './data.json';
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaFirstAid,
  FaLock,
  FaHandsHelping,
  FaFireExtinguisher,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH
} from 'react-icons/fa';
import { WiDayStormShowers } from 'react-icons/wi';
import './Tutorial.css';

const iconComponents = {
  1: FaShieldAlt,
  2: WiDayStormShowers,
  3: FaExclamationTriangle,
  4: FaFirstAid,
  5: FaLock,
  6: FaHandsHelping,
  7: FaFireExtinguisher
};

const colorsMap = {
  1: '#E63946',
  2: '#457B9D',
  3: '#F4A261',
  4: '#2A9D8F',
  5: '#264653',
  6: '#8D99AE',
  7: '#E76F51'
};

export default function Tutorials2() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(3); // عرض 3 عناصر فقط في كل صفحة

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  // Pagination Logic
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = selectedCategory?.tutorials?.slice(indexOfFirstTutorial, indexOfLastTutorial) || [];
  const totalPages = Math.ceil(selectedCategory?.tutorials?.length / tutorialsPerPage) || 0;

  // شرط عرض الـ Pagination: يجب أن يكون هناك 3 عناصر أو أكثر
  const shouldShowPagination = selectedCategory?.tutorials?.length >= 3;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // عدد الصفحات المرئية في ال Pagination
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currentPage - half;
      let end = currentPage + half;
      
      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }
      
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
      }
      
      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
          pageNumbers.push('ellipsis-start');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageNumbers.push('ellipsis-end');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="tutorials-container py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold section-title">Explore Our Tutorials</h2>
        
        {!selectedCategory ? (
          <div className="row g-4">
            {categories.map(cat => {
              const Icon = iconComponents[cat.id];
              return (
                <div className="col-lg-4 col-md-6" key={cat.id}>
                  <div
                    className="card category-card text-center p-4 h-100"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1); // إعادة تعيين الصفحة عند اختيار فئة جديدة
                    }}
                  >
                    <div className="category-icon mb-3">
                      <Icon
                        style={{
                          color: colorsMap[cat.id],
                          fontSize: '2.5rem',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>
                    <h5 className="mb-2 fw-semibold card-title">{cat.title}</h5>
                    <p className="text-muted card-description">{cat.description}</p>
                    <div className="hover-indicator" style={{ backgroundColor: colorsMap[cat.id] }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="tutorials-detail">
            <button
              className="btn back-button mb-4 d-flex align-items-center"
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1); // إعادة تعيين الصفحة عند الرجوع
              }}
            >
              <FaChevronLeft className="me-2" /> Back to Categories
            </button>
            
            <div className="category-header mb-4">
              <div className="category-icon-lg mb-3" style={{ backgroundColor: colorsMap[selectedCategory.id] }}>
                {React.createElement(iconComponents[selectedCategory.id], { 
                  style: { color: 'white', fontSize: '1.8rem' } 
                })}
              </div>
              <h4 className="fw-bold category-title">{selectedCategory.title}</h4>
              <p className="category-description">{selectedCategory.description}</p>
            </div>
            
            <div className="row g-4 mb-4">
              {currentTutorials.map(tut => (
                <div className="col-lg-4 col-md-6" key={tut.id}>
                  <div className="card tutorial-card h-100">
                    <div className="thumbnail-container">
                      <img
                        src={tut.thumbnail}
                        className="card-img-top"
                        alt={tut.title}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="fw-bold tutorial-title">{tut.title}</h6>
                      <p className="text-muted tutorial-description">{tut.description}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <a
                        href={tut.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary view-button"
                      >
                        View {tut.type}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Component - يظهر فقط إذا كان هناك 3 عناصر أو أكثر */}
            {shouldShowPagination && totalPages > 1 && (
              <nav className="pagination-container">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                      <FaChevronLeft />
                    </button>
                  </li>
                  
                  {getPageNumbers().map((number, index) => (
                    <React.Fragment key={index}>
                      {number === 'ellipsis-start' || number === 'ellipsis-end' ? (
                        <li className="page-item disabled">
                          <span className="page-link ellipsis">
                            <FaEllipsisH />
                          </span>
                        </li>
                      ) : (
                        <li className={`page-item ${currentPage === number ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </button>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}