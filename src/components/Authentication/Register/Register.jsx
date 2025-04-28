import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';
import './Form.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = 'Field is required';
        else if (value.length < 2) error = 'At least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'At least 6 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: `${formData.firstName} ${formData.lastName}`
          });
        }

        // تفجير الكونفيتي 🎊
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        // عرض إشعار Toast مخصص
        toast.success(
          <div>
            <h3>🎉 Welcome, {formData.firstName}!</h3>
            <p>Your account has been created successfully.</p>
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

        // الانتقال إلى صفحة Login بعد 3 ثواني
        setTimeout(() => navigate('/login'), 3000);

      } catch (error) {
        toast.error(
          error.code === 'auth/email-already-in-use' 
            ? 'The email is already in use. Please try another email.' 
            : error.message,
          {
            position: "top-center",
            theme: "colored"
          }
        );
      }
    }
  };

  return (
    <div className="auth-container register">
      <ToastContainer />
      
      <div className="auth-wrapper">
        <div className="left-section position-relative">
          <img 
            src="/imgs/register22.png" 
            alt="Register Illustration" 
            className="auth-image d-block position-absolute w-75"
          />
          <div className="gradient-overlay"></div>
        </div>

        <div className="right-section">
          <div className="auth-form">
            <div className="form-header">
              <h1>Register Your Account</h1>
               
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="auth-button">Register</button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;