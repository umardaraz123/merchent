import React, { createContext, useContext, useState, useEffect } from 'react';
import { setItem, getItems, removeItem, clearStore, itemExists, updateQty, getItemDetail } from '../utils/indexedDB';

// Create context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartDetail, setCartDetail] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load data from IndexedDB on startup
    useEffect(() => {
        const fetchData = async () => {
            setCart(await getItems('cart'));
            setWishlist(await getItems('wishlist'));
        };
        fetchData();
    }, []);

    // Add to Cart
    const addToCart = async (product) => {
        await setItem('cart', product);
        setCart(await getItems('cart'));

    };

    // Remove from Cart
    const removeFromCart = async (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        await removeItem('cart', id);
    };

    // Add to Wishlist
    const addToWishlist = async (product) => {
        const updatedWishlist = [...wishlist, product];
        // setWishlist(updatedWishlist);
        await setItem('wishlist', product);

        setWishlist(await getItems('wishlist'));
    };

    // Remove from Wishlist
    const removeFromWishlist = async (id) => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(updatedWishlist);
        await removeItem('wishlist', id);
    };

    // Move item from Wishlist to Cart
    const moveToCart = async (product) => {
        await removeFromWishlist(product.id);
        await addToCart(product);
    };

    const itemExistsInWishlish = async (id) => {
        const result = await itemExists('wishlist', id);
        console.log('wishlist ========= ', result);
        return result;
    }

    const itemExistsInCart = async (id) => {
        const result = await itemExists('cart', id);
        console.log('cart ========= ', result);
        return result;
    }

    const updateCartQty = async (id, quantity) => {
        console.log('quantity ========== ', quantity);
        const result = await updateQty('cart', id, quantity);
        console.log('result =========== ', result);
        return result;
    }
    const updateWishlisttQty = async (id, quantity) => {
        const result = await updateQty('wishlist', id, quantity);
        return result;
    }
    const getCartDetail = async(id) => {
        const result = await getItemDetail('cart', id);
        setCartDetail(result);
        
    }


    return (
        <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist, moveToCart, itemExistsInWishlish, itemExistsInCart, updateCartQty, updateWishlisttQty, getCartDetail, cartDetail }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook for using Cart Context
export const useCart = () => useContext(CartContext);
