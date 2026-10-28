"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/app/actions";

const AddToCartButton = ({ dishId }) => {
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      const result = await addToCart(dishId);
      if (result?.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-600"
    >
      {pending ? "Adding..." : added ? "Added!" : "Add to cart"}
    </button>
  );
};

export default AddToCartButton;
