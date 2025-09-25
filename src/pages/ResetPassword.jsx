import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { MdArrowBack, MdLock } from 'react-icons/md';
import { Auth } from '../services/Auth';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setTokenValid(false);
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('token', token);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);

      const result = await Auth.resetPassword(formData);

      if (result.status === 200) {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorMessage = result?.data?.message || 'Failed to reset password';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="invalid-token-header">
            <div className="invalid-icon">
              <FaShieldAlt size={48} color="#e74c3c" />
            </div>
            <h1>Invalid Reset Link</h1>
            <p>This password reset link is invalid or has expired.</p>
          </div>
          <Link to="/forgot-password" className="reset-btn">
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <ToastContainer />
      <div className="reset-password-card">
        <div className="reset-password-header">
          <div className="reset-password-icon">
            <MdLock size={48} />
          </div>
          <h1>Reset Your Password</h1>
          <p>Enter a new password for your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <div className="password-input-wrapper">
              <MdLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="modern-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle-modern"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-strength">
              <span className="strength-text">
                Password must be at least 6 characters long
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <MdLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="modern-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle-modern"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-small"></div>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="reset-password-footer">
          <Link to="/login" className="back-to-login-modern">
            <MdArrowBack size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;