import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming you have a firebase.js file with your config
import { collection, addDoc } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // State for form validation and submission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name should contain only letters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last name should contain only letters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      try {
        // Add document to Firestore
        await addDoc(collection(db, 'contactMessages'), {
          'first-name': formData.firstName,
          'last-name': formData.lastName,
          'email': formData.email,
          'message': formData.message,
          'timestamp': new Date()
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        
        setSubmitStatus('success');
      } catch (error) {
        console.error('Error submitting form: ', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.contactUsPage}>
      <div className={styles.header}>
        <Container>
          <h1 className="text-center text-white mb-0 pt-5 mt-4">Contact Us</h1>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-5">
          <Col md={6} data-aos="fade-right">
            <div className={styles.connectSection}>
              <h2 className={styles.connectHeading}>CONNECT WITH US</h2>
              <p className={styles.stayInformed}>
                STAY INFORMED, <span className={styles.stayRed}>STAY SAFE</span>
              </p>
              <p className={styles.connectText}>
                If you need assistance or any queries please reach out to our friendly support team.
              </p>

              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Call for inquiry</h3>
                    <p>+20 1148204617</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Send us email</h3>
                    <p>mahmoudhassan10021@gmail.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Location</h3>
                    <p>Minya</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={6} data-aos="fade-left">
            <div className={styles.formContainer}>
              <h3 className={styles.formHeading}>Contact Info</h3>
              
              {submitStatus === 'success' && (
                <Alert variant="success" className="mb-4">
                  Message sent successfully!
                </Alert>
              )}
              
              {submitStatus === 'error' && (
                <Alert variant="danger" className="mb-4">
                  There was an error sending your message, please try again!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label className={styles.formLabel}>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                        placeholder="Your first name"
                        className={styles.formControl}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label className={styles.formLabel}>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                        placeholder="Your last name"
                        className={styles.formControl}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className={styles.formLabel}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="youremail@example.com"
                    className={styles.formControl}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="message">
                  <Form.Label className={styles.formLabel}>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    placeholder="Your message..."
                    className={styles.formControl}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="danger"
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
{/*                 <iframe  width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
 */}
        <Row data-aos="fade-up">
          <Col>
            <div className={styles.mapContainer}>
              <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518.6070173649186!2d30.734118784928626!3d28.128003582619616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b2552474cdc59%3A0xd9d57bc4a705a4ae!2z2YXYudmH2K8g2KrZg9mG2YjZhNmI2KzZitinINin2YTZhdi52YTZiNmF2KfYqiDYqNin2YTZhdmG2YrYpw!5e0!3m2!1sar!2seg!4v1745916299287!5m2!1sar!2seg"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;