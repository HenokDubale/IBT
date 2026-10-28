export default function Loading() {
  return (
    <div className="w-full px-6" role="status">
      <div className="h-10 w-48 mb-4 rounded bg-gray-700 animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-12 rounded bg-gray-800 animate-pulse" />
        ))}
      </div>
      <span className="sr-only">Loading orders</span>
    </div>
  );
}
