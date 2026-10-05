import { notFound } from "next/navigation";

const DISHES = [
  {
    id: "1",
    name: "Doro Wat",
    price: "450 ETB",
    desc: "Spicy chicken stew served with boiled egg and Injera.",
  },
  {
    id: "2",
    name: "Beyaynetu",
    price: "250 ETB",
    desc: "Assorted vegan stews served on a large Injera platter.",
  },
  {
    id: "3",
    name: "Kitfo",
    price: "500 ETB",
    desc: "Minced raw beef seasoned with mitmita and niter kibbeh.",
  },
];

export async function generateStaticParams() {
  return DISHES.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = DISHES.find((d) => d.id === id);

  if (!dish) return notFound();

  return (
    <div>
      <h1>{dish.name}</h1>
      <p>{dish.desc}</p>
      <span>{dish.price}</span>
      <button>Add to Cart</button>
    </div>
  );
}
