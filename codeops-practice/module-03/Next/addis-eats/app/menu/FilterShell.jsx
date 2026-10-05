"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Stews", "Vegan", "Drinks"];

  return (
    <div>
      <CategoryBar
        categories={categories}
        activeCategory={category}
        onSelectCategory={setCategory}
      />
      {children}
    </div>
  );
}