// src/contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService, wishlistService, handleApiError } from '../services/apiService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
    

  

  // Fetch cart and wishlist on component mount
  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCarts(response.data.cart);
      setCartTotal(response.data.total);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      setWishlist(response.data.wishlist);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, priceId, quantity = 1) => {

    if (!token) {
        window.location.href = '/login';
    }

    try {
      setLoading(true);
      await cartService.addToCart(productId, priceId, quantity);
      await fetchCart();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartId, quantity, priceId) => {

    if (!token) {
        window.location.href = '/login';
    }

    try {
      setLoading(true);
      await cartService.updateCart(cartId, quantity, priceId);
      await fetchCart();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId) => {
    if (!token) {
      window.location.href = '/login';
    }
    try {
      setLoading(true);
      await cartService.removeFromCart(cartId);
      await fetchCart();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId, priceId) => {

    if (!token) {
      window.location.href = '/login';
    }

    try {
      setLoading(true);
      await wishlistService.addToWishlist(productId, priceId);
      await fetchWishlist();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId) => {

    if (!token) {
      window.location.href = '/login';
    }

    try {
      setLoading(true);
      await wishlistService.removeFromWishlist(wishlistId);
      await fetchWishlist();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const moveToCart = async (wishlistId, productId) => {
    if (!token) {
      window.location.href = '/login';
    }
    try {
      setLoading(true);
      // Add to cart
      const cartResponse = await cartService.addToCart(productId, 1);
      
      // Remove from wishlist if cart addition was successful
      if (cartResponse.success) {
        await wishlistService.removeFromWishlist(wishlistId);
      }
      
      // Refresh both cart and wishlist
      await fetchCart();
      await fetchWishlist();
      
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        wishlist,
        cartTotal,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        fetchCart,
        fetchWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);




