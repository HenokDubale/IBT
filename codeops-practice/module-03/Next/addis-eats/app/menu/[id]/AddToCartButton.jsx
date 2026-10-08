"use client";

import { useCart } from "../../providers";

export default function AddToCartButton({ dish }) {
  const { cart, addToCart } = useCart();
  const count = cart.filter((item) => item.id === dish.id).length;

  return (
    <button
      type="button"
      className="btn"
      onClick={() =>
        addToCart({ id: dish.id, name: dish.name, price: dish.price })
      }
    >
      Add to Cart{count > 0 ? ` (${count} in cart)` : ""}
    </button>
  );
}
