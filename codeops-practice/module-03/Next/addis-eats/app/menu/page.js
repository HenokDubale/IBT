import { Suspense } from "react";
import FilterShell from "./FilterShell";
import DishList from "./DishList";

export const revalidate = 60;

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>
      <FilterShell>
        <Suspense fallback={<p className="muted">Loading menu items...</p>}>
          <DishList />
        </Suspense>
      </FilterShell>
    </div>
  );
}