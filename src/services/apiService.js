// src/services/apiService.js
import axios from 'axios';

const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

         
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+AUTH_TOKEN
  }
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Cart API methods
export const cartService = {
  addToCart: (productId, quantity) => API.post('api/v1/cart/add', { product_id: productId, quantity }),
  getCart: () => API.get('api/v1/cart'),
  updateCart: (cartId, quantity) => API.post('api/v1/cart/update', { cart_id: cartId, quantity }),
  removeFromCart: (cartId) => API.post('api/v1/cart/remove', { cart_id: cartId })
};

// Wishlist API methods
export const wishlistService = {
  addToWishlist: (productId) => API.post('api/v1/wishlist/add', { product_id: productId }),
  getWishlist: () => API.get('api/v1/wishlist'),
  removeFromWishlist: (wishlistId) => API.post('api/v1/wishlist/remove', { wishlist_id: wishlistId })
};

// Error handling helper
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error:', error.request);
    return 'No response from server';
  } else {
    // Something happened in setting up the request
    console.error('API Error:', error.message);
    return error.message;
  }
};