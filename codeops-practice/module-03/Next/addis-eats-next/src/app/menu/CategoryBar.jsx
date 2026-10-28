"use client";

const CategoryBar = ({ categories, selected, onSelect }) => {
  const all = ["All", ...categories];

  return (
    <div>
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={
            selected === cat
              ? "block w-full mb-2 px-3 py-2 text-sm text-left bg-blue-500 text-white"
              : "block w-full mb-2 px-3 py-2 text-sm text-left bg-gray-700 text-white"
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
