const DISHES = [
  {
    id: "1",
    name: "Doro Wat",
    category: "Stews",
    price: "450 ETB",
    desc: "Spicy chicken stew served with boiled egg and injera.",
  },
  {
    id: "2",
    name: "Beyaynetu",
    category: "Vegan",
    price: "250 ETB",
    desc: "Assorted vegan stews served on a large injera platter.",
  },
  {
    id: "3",
    name: "Kitfo",
    category: "Meat",
    price: "500 ETB",
    desc: "Minced beef seasoned with mitmita and niter kibbeh.",
  },
  {
    id: "4",
    name: "Tibs",
    category: "Meat",
    price: "380 ETB",
    desc: "Sauteed beef cubes with onion, pepper and rosemary.",
  },
  {
    id: "5",
    name: "Buna",
    category: "Drinks",
    price: "60 ETB",
    desc: "Traditional Ethiopian coffee, roasted and brewed fresh.",
  },
];

export async function getDishes() {
  // Swap in your real URL when ready:
  // const res = await fetch("YOUR_URL", { next: { revalidate: 60 } });
  // return res.json();
  return DISHES;
}

export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((d) => d.id === id);
}
