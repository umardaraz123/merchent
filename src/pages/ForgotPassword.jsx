import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { MdEmail, MdArrowBack } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('OTP sent to your email!');
      navigate('/auth-code', { state: { email } });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-wrapper">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon">
            <FiMail size={48} />
          </div>
          
          <div className="auth-header">
            <h2>Forgot Password</h2>
            <p>Enter your email address and we'll send you an OTP to reset your password.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
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

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/login" className="back-link">
              <MdArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;