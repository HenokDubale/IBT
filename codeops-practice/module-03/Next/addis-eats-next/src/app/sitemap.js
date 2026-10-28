import { getDishes } from "@/app/menu/data";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  const dishes = await getDishes();

  const staticPages = ["", "/menu"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const dishPages = dishes.map((dish) => ({
    url: `${SITE_URL}/menu/${dish.id}`,
  }));

  return [...staticPages, ...dishPages];
}