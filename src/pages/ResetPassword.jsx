import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash, FaShieldAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return { minLength, hasLetter, hasNumber, isValid: minLength && hasLetter && hasNumber };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('Password reset successfully!');
      navigate('/login', { replace: true });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-wrapper">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon primary">
            <FaLock size={48} />
          </div>
          
          <div className="auth-header">
            <h2>Reset Password</h2>
            <p>Create a new secure password for your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="modern-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

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
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {formData.password && (
                <div className="password-requirements">
                  <div className={`requirement ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                    ✓ At least 6 characters
                  </div>
                  <div className={`requirement ${passwordValidation.hasLetter ? 'valid' : 'invalid'}`}>
                    ✓ Contains letters
                  </div>
                  <div className={`requirement ${passwordValidation.hasNumber ? 'valid' : 'invalid'}`}>
                    ✓ Contains numbers
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="modern-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="error-message">
                  Passwords do not match
                </div>
              )}
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
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