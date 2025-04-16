import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
      // If user doesn't have required role, redirect based on their actual role
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate, token, user, allowedRoles]);

  // If no redirection needed, render the child routes
  if (token && (!allowedRoles || (user && allowedRoles.includes(user.role)))) {
    return <Outlet />;
  }

  // Default return (will be briefly shown before useEffect runs)
  return null;
};

export default AuthMiddleware;