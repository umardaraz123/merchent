import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaRedo, FaCheckCircle } from 'react-icons/fa';
import { MdArrowBack, MdMailOutline } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Auth } from '../services/Auth';
import 'react-toastify/dist/ReactToastify.css';

const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email || '';

  const handleResendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);

      const result = await Auth.forgotPassword(formData);

      if (result.status === 200) {
        toast.success('Reset email sent again!');
      } else {
        toast.error('Failed to resend email');
      }
    } catch (error) {
      toast.error('Failed to resend email');
    }
  };

  return (
    <div className="check-email-container">
      <ToastContainer />
      <div className="check-email-card">
        <div className="check-email-header">
          <div className="check-email-icon-wrapper">
            <div className="check-email-icon">
              <MdMailOutline size={64} />
            </div>
            <div className="check-mark">
              <FaCheckCircle size={24} />
            </div>
          </div>
          <h1>Check Your Email</h1>
          <p>We've sent a password reset link to</p>
          <div className="email-highlight">
            {email}
          </div>
        </div>

        <div className="email-instructions-card">
          <div className="instruction-item">
            <span className="step-number">1</span>
            <span className="instruction-text">Check your email inbox</span>
          </div>
          <div className="instruction-item">
            <span className="step-number">2</span>
            <span className="instruction-text">Click the reset link in the email</span>
          </div>
          <div className="instruction-item">
            <span className="step-number">3</span>
            <span className="instruction-text">Create a new password</span>
          </div>
        </div>

        <div className="email-note">
          <p>Didn't receive the email? Check your spam folder or</p>
        </div>

        <div className="check-email-actions">
          <button onClick={handleResendEmail} className="resend-button">
            <FaRedo />
            Resend Email
          </button>
          
          <Link to="/login" className="back-to-login-modern">
            <MdArrowBack size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;