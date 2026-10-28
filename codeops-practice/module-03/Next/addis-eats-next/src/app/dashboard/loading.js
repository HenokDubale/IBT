export default function Loading() {
  return (
    <div className="w-full px-6" role="status">
      <div className="h-10 w-48 mb-4 rounded bg-gray-700 animate-pulse" />
      <div className="h-72 rounded bg-gray-800 animate-pulse" />
      <span className="sr-only">Loading dashboard</span>
    </div>
  );
}
