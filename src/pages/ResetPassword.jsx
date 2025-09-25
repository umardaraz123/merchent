import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash, FaShieldAlt, FaLock, FaEnvelope, FaKey } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { Auth } from '../services/Auth';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '', // Changed to match API convention
    otp: '' // OTP will be hidden but included in API call
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get OTP and email from navigation state (passed from AuthCode component)
  useEffect(() => {
    if (location.state) {
      const { email, otp, otpVerified, verificationToken } = location.state;
      
      if (email && otp && otpVerified) {
        setFormData(prev => ({
          ...prev,
          email: email,
          otp: otp
        }));
        setOtpVerified(true);
        
        // If using token-based verification
        if (verificationToken) {
          setFormData(prev => ({
            ...prev,
            verification_token: verificationToken
          }));
        }
      } else {
        // Redirect if OTP not verified
        toast.error('Please verify your OTP first');
        navigate('/forgot-password');
      }
    } else {
      // Redirect if no state (direct access)
      toast.error('Invalid access. Please request password reset first.');
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8; // Increased to 8 for better security
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { 
      minLength, 
      hasLetter, 
      hasNumber, 
      hasSpecialChar,
      isValid: minLength && hasLetter && hasNumber && hasSpecialChar 
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!otpVerified) {
      toast.error('OTP verification required');
      return;
    }

    if (!passwordValidation.isValid) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.otp) {
      toast.error('OTP is required');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API call
      const resetData = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        otp: formData.otp, // Hidden OTP from navigation state
        // Include verification token if available
        ...(formData.verification_token && { verification_token: formData.verification_token })
      };

      // Call the reset password API
      const result = await Auth.resetPassword(resetData);

      if (result.status === 200 && result.data.success) {
        toast.success('Password reset successfully!');
        
        // Redirect to login with success message
        setTimeout(() => {
          navigate('/login', { 
            replace: true,
            state: { 
              message: 'Password reset successfully! Please login with your new password.',
              email: formData.email 
            }
          });
        }, 1500);
        
      } else {
        // Handle API error responses
        const errorMessage = result.data.message || 
                           result.data.error || 
                           'Password reset failed. Please try again.';
        toast.error(errorMessage);
        
        // If OTP is invalid, redirect back to OTP verification
        if (result.data.message?.toLowerCase().includes('otp') || 
            result.data.message?.toLowerCase().includes('code')) {
          setTimeout(() => {
            navigate('/auth-code', { 
              state: { 
                email: formData.email,
                error: 'Invalid or expired OTP. Please verify again.' 
              }
            });
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Reset password error: ", error);
      
      // Enhanced error handling
      if (error?.response?.data?.errors) {
        // Handle Laravel validation errors
        const errors = error.response.data.errors;
        Object.values(errors).forEach(errorArray => {
          errorArray.forEach(errorMessage => toast.error(errorMessage));
        });
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message?.includes('Network') || error?.message?.includes('network')) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      
      // If it's an OTP-related error, offer to resend
      if (error?.response?.data?.message?.toLowerCase().includes('otp')) {
        setTimeout(() => {
          if (window.confirm('OTP seems to be invalid. Would you like to receive a new one?')) {
            navigate('/auth-code', { 
              state: { 
                email: formData.email,
                resend: true 
              }
            });
          }
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Format email for display (mask for privacy)
  const formatEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) return email;
    return `${localPart.substring(0, 3)}***@${domain}`;
  };

  return (
    <div className="auth-wrapper">
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon primary">
            <FaLock size={48} />
          </div>
          
          <div className="auth-header">
            <h2>Reset Password</h2>
            <p>Create a new secure password for your account</p>
            
            {/* Display verified email */}
            {formData.email && (
              <div className="verified-email">
                <FaShieldAlt className="shield-icon" />
                <span>Verified: {formatEmail(formData.email)}</span>
              </div>
            )}
            
            {/* OTP status */}
            {otpVerified ? (
              <div className="otp-status success">
                <FaKey className="key-icon" />
                <span>OTP Verified Successfully</span>
              </div>
            ) : (
              <div className="otp-status error">
                <span>OTP Verification Required</span>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Hidden OTP field (for debugging visibility, but not editable) */}
            <input 
              type="hidden" 
              name="otp" 
              value={formData.otp} 
            />
            
            {/* Hidden email field */}
            <input 
              type="hidden" 
              name="email" 
              value={formData.email} 
            />

            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="modern-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password (min. 8 characters)"
                  required
                  minLength="8"
                  disabled={loading || !otpVerified}
                />
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || !otpVerified}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {formData.password && (
                <div className="password-requirements">
                  <div className={`requirement ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                    {passwordValidation.minLength ? '✓' : '✗'} At least 8 characters
                  </div>
                  <div className={`requirement ${passwordValidation.hasLetter ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasLetter ? '✓' : '✗'} Contains letters
                  </div>
                  <div className={`requirement ${passwordValidation.hasNumber ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasNumber ? '✓' : '✗'} Contains numbers
                  </div>
                  <div className={`requirement ${passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasSpecialChar ? '✓' : '✗'} Contains special characters
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  className="modern-input"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  placeholder="Confirm your new password"
                  required
                  disabled={loading || !otpVerified}
                />
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading || !otpVerified}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {formData.password_confirmation && formData.password !== formData.password_confirmation && (
                <div className="error-message">
                  ✗ Passwords do not match
                </div>
              )}
              
              {formData.password_confirmation && formData.password === formData.password_confirmation && (
                <div className="success-message">
                  ✓ Passwords match
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="auth-btn primary" 
              disabled={loading || !otpVerified || !passwordValidation.isValid || formData.password !== formData.password_confirmation}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="auth-actions">
            <button 
              type="button"
              className="auth-btn secondary"
              onClick={() => navigate('/auth-code', { state: { email: formData.email } })}
              disabled={loading}
            >
              <FaKey />
              Re-verify OTP
            </button>
          </div>

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

export default ResetPassword;