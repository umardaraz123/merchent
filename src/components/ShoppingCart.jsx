import React from 'react';

const ShoppingCart = ({ carts }) => {
    const totalQuantity = Array.isArray(carts)  ? carts.reduce((total, item) => { return total + (Number(item.quantity) || 0); }, 0) : 0;

    return (
    <div className="count">
    { totalQuantity }
    </div>
  );
};

export default ShoppingCart;