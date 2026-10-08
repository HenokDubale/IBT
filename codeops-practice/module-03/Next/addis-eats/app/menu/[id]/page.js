import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish, getDishes } from "../data";
import AddToCartButton from "./AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  return (
    <article className="dish-detail">
      <span className="badge">{dish.category}</span>
      <h1>{dish.name}</h1>
      <p>{dish.desc}</p>
      <p className="price">{dish.price}</p>
      <AddToCartButton dish={dish} />
      <p>
        <Link href="/menu">Back to menu</Link>
      </p>
    </article>
  );
}
