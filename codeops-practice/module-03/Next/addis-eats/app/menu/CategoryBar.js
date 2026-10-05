"use client";

export default function CategoryBar({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelectCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
