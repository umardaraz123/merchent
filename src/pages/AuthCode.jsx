import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaShieldAlt, FaArrowLeft, FaRedo } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const AuthCode = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@example.com';

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
    
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus the next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('OTP verified successfully!');
      navigate('/reset-password', { state: { email, verified: true } });
      setLoading(false);
    }, 1000);
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('New OTP sent to your email!');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setResendLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-wrapper">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon success">
            <FaShieldAlt size={48} />
          </div>
          
          <div className="auth-header">
            <h2>Enter Verification Code</h2>
            <p>We've sent a 6-digit code to:</p>
            <strong className="email-highlight">{email}</strong>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="otp-input"
                  disabled={loading}
                />
              ))}
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </form>

          <div className="auth-actions">
            <button 
              onClick={handleResendOTP} 
              className="resend-btn"
              disabled={timer > 0 || resendLoading}
            >
              {resendLoading ? (
                <>
                  <div className="btn-spinner small"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaRedo />
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </>
              )}
            </button>
          </div>

          <div className="auth-footer">
            <Link to="/forgot-password" className="back-link">
              <FaArrowLeft /> Back to Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCode;