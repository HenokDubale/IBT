"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

const FilterShell = ({ categories, dishes }) => {
  const [selected, setSelected] = useState("All");

  const visible =
    selected === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selected);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_220px]">
      <DishList dishes={visible} />
      <aside className="self-start md:sticky md:top-4 md:border-l md:pl-4">
        <CategoryBar
          categories={categories}
          selected={selected}
          onSelect={setSelected}
        />
      </aside>
    </div>
  );
};

export default FilterShell;
