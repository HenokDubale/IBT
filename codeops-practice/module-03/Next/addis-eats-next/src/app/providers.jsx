"use client";

import { CartProvider } from "./CartContext";

const Providers = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;