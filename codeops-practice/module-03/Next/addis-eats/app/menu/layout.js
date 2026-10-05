import Link from "next/link";

export default function MenuLayout({ children }) {
  const categories = [
    { id: "all", name: "All Dishes" },
    { id: "injera", name: "Injera Specials" },
    { id: "vegan", name: "Fasting / Beyaynetu" },
    { id: "drinks", name: "Traditional Drinks" },
  ];

  return (
    <div>
      <aside>
        <h2>Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/menu?category=${cat.id}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <section>{children}</section>
    </div>
  );
}
