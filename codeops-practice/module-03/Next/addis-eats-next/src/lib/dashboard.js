const TZ = "Africa/Addis_Ababa";

const dayKey = (date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date); // 2026-10-28

const dayLabel = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
  }).format(date);

export function revenueByNeighbourhood(orders) {
  const totals = new Map();
  for (const order of orders) {
    if (order.status === "cancelled") continue;
    const key = order.neighbourhood ?? "Unknown";
    totals.set(key, (totals.get(key) ?? 0) + order.total);
  }
  return [...totals]
    .map(([neighbourhood, revenue]) => ({ neighbourhood, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function ordersPerDay(orders, days = 7) {
  const now = Date.now();
  const buckets = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    buckets.push({ key: dayKey(date), day: dayLabel(date), orders: 0 });
  }
  const byKey = new Map(buckets.map((b) => [b.key, b]));

  for (const order of orders) {
    if (order.status === "cancelled") continue;
    const bucket = byKey.get(dayKey(new Date(order.createdAt)));
    if (bucket) bucket.orders += 1;
  }
  return buckets.map(({ day, orders }) => ({ day, orders }));
}

// ---- table: sort and page come from the URL, so whitelist them ----
export const SORT_KEYS = ["createdAt", "neighbourhood", "total", "status"];
export const PAGE_SIZE = 5;

const valueOf = (order, key) =>
  key === "createdAt" ? new Date(order.createdAt).getTime() : order[key];

export function getTableData(orders, { sort, dir, page }) {
  const sortKey = SORT_KEYS.includes(sort) ? sort : "createdAt";
  const direction = dir === "asc" ? "asc" : "desc";

  const sorted = [...orders].sort((a, b) => {
    const x = valueOf(a, sortKey);
    const y = valueOf(b, sortKey);
    const result =
      typeof x === "number" && typeof y === "number"
        ? x - y
        : String(x ?? "").localeCompare(String(y ?? ""));
    return direction === "asc" ? result : -result;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const current = Math.min(Math.max(parseInt(page, 10) || 1, 1), totalPages);

  return {
    rows: sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    sort: sortKey,
    dir: direction,
    page: current,
    totalPages,
  };
}
