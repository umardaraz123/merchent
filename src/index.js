import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';


const root = createRoot(document.getElementById('root'));
root.render(
  <UserProvider >
  <CartProvider>
    <App />
  </CartProvider>
  </UserProvider>
);
