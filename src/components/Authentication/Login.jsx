 import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';
import './EmailVerification.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Must be at least 6 characters';
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [fieldName]: error
    });
  };

  const validateForm = () => {
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);

        // تأثير الكونفيتي عند النجاح 🎊
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // إشعار Toast مخصص
        toast.success(
          <div>
            <h3>✨ Welcome Back!</h3>
            <p>You've logged in successfully.</p>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            style: {
              background: "linear-gradient(to right, #4CAF50, #2E7D32)"
            }
          }
        );

        setTimeout(() => navigate('/dashboard'), 3000);

      } catch (error) {
        toast.error(
          error.message.includes('user-not-found') || error.message.includes('wrong-password')
            ? 'Incorrect email or password. Please try again.'
            : error.message,
          {
            position: "top-center",
            theme: "colored",
            style: {
              background: "#ff4444"
            }
          }
        );
      }
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />

      <div className="auth-wrapper">
        <div className="left-section">
          <img 
            src="/imgs/verification.png" 
            alt="Login Illustration" 
            className="auth-image"
          />
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="right-section">
          <div className="auth-form">
            <div className="form-header">
              <h1>Welcome Back</h1>
              <p>Please login to your account</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                 
              </div>

              <button type="submit" className="auth-button">Login</button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;