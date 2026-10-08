"use client";

export default function CategoryBar({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="category-bar" role="group" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === activeCategory ? "chip chip-active" : "chip"}
          aria-pressed={cat === activeCategory}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
