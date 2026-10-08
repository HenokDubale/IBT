import Link from "next/link";
import { categories } from "./categories";
import { getDishes } from "./data";

export default async function MenuLayout({ children }) {
  const dishes = await getDishes();
  const groups = categories.filter((c) => c !== "All");

  return (
    <div className="menu-layout">
      <aside className="sidebar">
        <h2>Categories</h2>
        {groups.map((cat) => (
          <div key={cat} className="sidebar-group">
            <h3>{cat}</h3>
            <ul>
              {dishes
                .filter((d) => d.category === cat)
                .map((d) => (
                  <li key={d.id}>
                    <Link href={`/menu/${d.id}`}>{d.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <Link href="/menu" className="sidebar-all">All dishes</Link>
      </aside>

      <section className="menu-content">{children}</section>
    </div>
  );
}