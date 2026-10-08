import Link from "next/link";
import { getDishes } from "./data";

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article
          key={dish.id}
          className="dish-card"
          data-category={dish.category}
        >
          <span className="badge">{dish.category}</span>
          <h3>{dish.name}</h3>
          <p className="price">{dish.price}</p>
          <Link href={`/menu/${dish.id}`}>View details</Link>
        </article>
      ))}
    </div>
  );
}
