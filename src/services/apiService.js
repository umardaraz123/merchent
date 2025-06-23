// src/services/apiService.js
import axios from 'axios';
import { getFromCookies } from '../utils/cookieUtils';

const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('mmdeals-token') : null;

         


const random_string_detail = getFromCookies();

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
  addToCart: (productId, priceId, quantity) => API.post('api/v1/carts/add', { product_id: productId, price_id: priceId, quantity, random_string_detail: random_string_detail }),
  getCart: () => API.get(`api/v1/carts?random_string=${random_string_detail.uniqueString}`),
  updateCart: (cartId, quantity, priceId) => API.post('api/v1/carts/update', { cart_id: cartId, quantity, price_id: priceId }),
  removeFromCart: (cartId) => API.post('api/v1/carts/remove', { cart_id: cartId }),
  getProvinces: () => API.get('api/v1/provinces', { })
};

// Wishlist API methods
export const wishlistService = {
  addToWishlist: (productId, priceId) => API.post('api/v1/wishlist/add', { product_id: productId, price_id: priceId, random_string_detail: random_string_detail }),
  getWishlist: () => API.get(`api/v1/wishlist?random_string=${random_string_detail.uniqueString}`),
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