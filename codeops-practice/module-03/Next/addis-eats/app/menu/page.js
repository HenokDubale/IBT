import { Suspense } from "react";
import Link from "next/link";
import FilterShell from "./FilterShell";

export const revalidate = 60;

// Async server component that directly fetches dish data
async function DishList() {
  // Simulate database or API fetch delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const dishes = [
    { id: "1", name: "Doro Wat", price: "450 ETB" },
    { id: "2", name: "Beyaynetu", price: "250 ETB" },
    { id: "3", name: "Kitfo", price: "500 ETB" },
  ];

  return (
    <div>
      {dishes.map((dish) => (
        <div key={dish.id}>
          <h3>{dish.name}</h3>
          <p>{dish.price}</p>
          <Link href={`/menu/${dish.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

function MenuSkeleton() {
  return <p>Loading menu items...</p>;
}

export default async function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>
      <FilterShell>
        <Suspense fallback={<MenuSkeleton />}>
          <DishList />
        </Suspense>
      </FilterShell>
    </div>
  );
}
