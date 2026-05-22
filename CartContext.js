import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = (items) => setCartCount(items.reduce((s, i) => s + i.quantity, 0));

  return (
    <CartContext.Provider value={{ cartCount, updateCount }}>
      {children}
    </CartContext.Provider>
  );
};
