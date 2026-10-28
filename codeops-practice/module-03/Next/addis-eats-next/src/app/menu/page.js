import Link from "next/link";
import DishList from "./DishList";
import { getDishes } from "./data";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";

export const metadata = {
  title: "Menu",
  description:
    "Browse stews, tibs, fasting dishes and more. Prices in birr, ready to order.",
};

export const revalidate = 60;

const MenuPage = async () => {
  const dishes = await getDishes();

  // Computed on the server, so the client leaf receives only what it needs.
  const categories = [...new Set(dishes.map((dish) => dish.category))];

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-5xl mb-4">Menu</h1>
      <SearchBox />
      <FilterShell categories={categories} dishes={dishes} />
      <Link href="/cart" className="inline-block mt-4">
        Go to cart
      </Link>
    </div>
  );
};

export default MenuPage;
