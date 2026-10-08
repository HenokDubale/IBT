"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (dish) => setCart((prev) => [...prev, dish]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}
