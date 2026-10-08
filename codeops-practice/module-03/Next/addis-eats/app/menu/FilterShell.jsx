"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";
import { categories } from "./categories";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");

  return (
    <div className="filter-shell" data-category={category}>
      <CategoryBar
        categories={categories}
        activeCategory={category}
        onSelectCategory={setCategory}
      />
      {children}
    </div>
  );
}
