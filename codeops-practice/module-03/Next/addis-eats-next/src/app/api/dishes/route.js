import { getDishes } from "@/app/menu/data";

const PAGE_SIZE = 3;

export async function GET(request) {
  const dishes = await getDishes();
  const { searchParams } = new URL(request.url);

  const search = (searchParams.get("search") ?? "").trim().toLowerCase();

  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage >= 1 ? requestedPage : 1;

  const matches = search
    ? dishes.filter((dish) => dish.name.toLowerCase().includes(search))
    : dishes;

  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));

  const start = (page - 1) * PAGE_SIZE;
  const pageDishes = matches.slice(start, start + PAGE_SIZE);

  return Response.json({ dishes: pageDishes, page, totalPages });
}
