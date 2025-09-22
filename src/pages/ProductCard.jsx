import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from '../utils/imageUtils';
import { useLocation } from 'react-router-dom';

const ProductCard = ({ product={},isAuthenticated, setRedirectTo  }) => {
  
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    wishlist,
    moveToCart
  } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const location = useLocation();
    useEffect(()=>{
        if (!isAuthenticated) {
            setRedirectTo(location.pathname);
        }
    },[isAuthenticated, location, setRedirectTo])
  
  const isInWishlist = wishlist.some(item => item.product_id === product.id);
  
  const handleAddToCart = async () => {
    setIsProcessing(true);
    const result = await addToCart(product.id, quantity);
    if (result.success) {
      setActionMessage('Added to cart!');
      setTimeout(() => setActionMessage(''), 3000);
    }
    setIsProcessing(false);
  };
  
  const handleWishlistAction = async () => {
    setIsProcessing(true);
    if (isInWishlist) {
      const wishlistItem = wishlist.find(item => item.product_id === product.id);
      await removeFromWishlist(wishlistItem.id);
      setActionMessage('Removed from wishlist');
    } else {
      await addToWishlist(product.id);
      setActionMessage('Added to wishlist!');
    }
    setTimeout(() => setActionMessage(''), 3000);
    setIsProcessing(false);
  };
  
  const handleMoveToCart = async () => {
    if (!isInWishlist) return;
    
    setIsProcessing(true);
    const wishlistItem = wishlist.find(item => item.product_id === product.id);
    const result = await moveToCart(wishlistItem.id, product.id);
    if (result.success) {
      setActionMessage('Moved to cart!');
      setTimeout(() => setActionMessage(''), 3000);
    }
    setIsProcessing(false);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <ImageWithFallback 
          src={null} 
          fallbackSrc="/images/default-product.jpg" 
          alt="product" 
        />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistAction}
          disabled={isProcessing}
        >
          {isInWishlist ? '❤️' : '♡'}
        </button>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        
        <div className="quantity-selector">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        
        <div className="product-actions">
          <button 
            onClick={handleAddToCart}
            disabled={isProcessing}
            className="add-to-cart"
          >
            {isProcessing ? 'Adding...' : 'Add to Cart'}
          </button>
          
          {isInWishlist && (
            <button 
              onClick={handleMoveToCart}
              disabled={isProcessing}
              className="move-to-cart"
            >
              {isProcessing ? 'Moving...' : 'Move to Cart'}
            </button>
          )}
        </div>
        
        {actionMessage && (
          <div className="action-message">{actionMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
