"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (dish) => {
    setCart((prev) => {
      const exists = prev.some((i) => i.id === dish.id);
      if (exists) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const clear = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
