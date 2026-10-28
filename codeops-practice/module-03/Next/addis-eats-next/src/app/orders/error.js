"use client";

export default function Error({ reset }) {
  return (
    <div className="w-full px-6" role="alert">
      <h1 className="text-red-400 text-3xl mb-2">Something went wrong</h1>
      <p className="mb-4">We could not load your orders.</p>
      <button
        onClick={reset}
        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
