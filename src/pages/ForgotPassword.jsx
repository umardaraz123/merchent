import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Auth } from '../services/Auth';
import { MdEmail, MdArrowBack } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);

      const result = await Auth.forgotPassword(formData);

      if (result.status === 200) {
        navigate('/check-email', { state: { email } });
      } else {
        const errorMessage = result?.data?.message || 'Failed to send reset email';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <div className="forgot-password-icon">
            <FiMail size={48} />
          </div>
          <h1>Forgot Password?</h1>
          <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <MdEmail className="input-icon" />
              <input
                type="email"
                id="email"
                className="modern-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-small"></div>
                Sending...
              </>
            ) : (
              <>
                Send Reset Link
              </>
            )}
          </button>
        </form>

        <div className="forgot-password-footer">
          <Link to="/login" className="back-to-login">
            <MdArrowBack size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;