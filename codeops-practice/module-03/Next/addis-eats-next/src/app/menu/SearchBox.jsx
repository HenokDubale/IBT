"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DishCard from "./DishCard";

const SearchBox = () => {
  const [text, setText] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  // Debounce: update `debounced` only after 300 ms without typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(text.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [text]);

  // A null key means "do not fetch".
  const key = debounced
    ? `/api/dishes?search=${encodeURIComponent(debounced)}&page=${page}`
    : null;

  const { data, error, isLoading } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  return (
    <div className="mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search dishes..."
        className="w-full max-w-md px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
      />

      <div className="mt-3">
        {!key && (
          <p className="text-sm text-gray-400">Type to search the menu</p>
        )}

        {key && error && (
          <p className="text-sm text-red-400">Could not load results.</p>
        )}

        {key && isLoading && <p>Searching...</p>}

        {key && data && data.dishes.length === 0 && <p>No dishes found.</p>}

        {key && data && data.dishes.length > 0 && (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
                className="px-3 py-1 bg-gray-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= data.totalPages}
                className="px-3 py-1 bg-gray-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
