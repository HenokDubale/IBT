const MENU_URL = "https://addis-eats-backend.onrender.com/menu/";

// Convert the remote shape into the shape the app uses.
function normalize(item) {
  return {
    id: item.id,
    slug: item.slug,
    name: item.nameEn,
    nameAm: item.nameAm,
    category: item.category,
    price: item.priceETB,
    image: `/dishes/${item.slug}.jpg`,
    spiceLevel: item.spiceLevel,
    isFasting: item.isFasting,
    isSpecial: item.isSpecial,
    description: item.description,
    ingredients: item.ingredients,
    servings: item.servings,
  };
}

export async function getDishes() {
  // Cached for 60 seconds, so Render is not called on every visit.
  const res = await fetch(MENU_URL, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`Menu request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json.data.map(normalize);
}

export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((dish) => String(dish.id) === String(id));
}
