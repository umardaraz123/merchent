// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, check localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('mmdeals-user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('mmdeals-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('mmdeals-user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access
export const useUser = () => useContext(UserContext);
