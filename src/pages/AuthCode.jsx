import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaShieldAlt, FaArrowLeft, FaRedo } from 'react-icons/fa';
import { Auth } from '../services/Auth';
import 'react-toastify/dist/ReactToastify.css';

const AuthCode = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from navigation state or use default
  const email = location.state?.email || '';
  const otpType = location.state?.otpType || 'password_reset'; // 'password_reset', 'email_verification', etc.

  useEffect(() => {
    // Redirect if no email provided
    if (!email) {
      toast.error('Email address is required');
      navigate('/forgot-password');
      return;
    }

    // Focus first input on mount
    inputRefs.current[0]?.focus();
    
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Move to next input on arrow right
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Move to previous input on arrow left
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus(); // Focus last input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if OTP is complete
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for OTP verification
      const verificationData = {
        email: email,
        otp: otpCode,
        type: otpType // 'password_reset' or other types
      };

      // Call OTP verification API
      const result = await Auth.verifyOTP(verificationData);

      if (result.status === 200 && result.data.success) {
        toast.success('OTP verified successfully!');
        
        // Navigate to reset password screen with necessary data
        navigate('/reset-password', { 
          state: { 
            email: email,
            otp: otpCode, // Pass the OTP for additional security
            otpVerified: true,
            verificationToken: result.data.verification_token // If API returns a token
          }
        });
      } else {
        toast.error(result.data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error("OTP verification error: ", error);
      
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message?.includes('Network')) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0 || resendLoading) return;

    setResendLoading(true);

    try {
      const resendData = {
        email: email,
        type: otpType
      };

      const result = await Auth.resendOTP(resendData);

      if (result.status === 200 && result.data.success) {
        toast.success('New OTP sent to your email!');
        setTimer(60); // Reset timer
        setOtp(['', '', '', '', '', '']); // Clear OTP inputs
        inputRefs.current[0]?.focus(); // Focus first input
      } else {
        toast.error(result.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error("Resend OTP error: ", error);
      
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Format email for display (mask part of it)
  const formatEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    return `${localPart.substring(0, 2)}***@${domain}`;
  };

  return (
    <div className="auth-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon success">
            <FaShieldAlt size={48} />
          </div>
          
          <div className="auth-header">
            <h2>Enter Verification Code</h2>
            <p>We've sent a 6-digit code to:</p>
            <strong className="email-highlight">{formatEmail(email)}</strong>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  onFocus={(e) => e.target.select()}
                  className="otp-input"
                  disabled={loading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button 
              type="submit" 
              className="auth-btn primary" 
              disabled={loading || otp.join('').length !== 6}
            >
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
            <Link to="/forgot-password" state={{ email }} className="back-link">
              <FaArrowLeft />
              Back to Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCode;