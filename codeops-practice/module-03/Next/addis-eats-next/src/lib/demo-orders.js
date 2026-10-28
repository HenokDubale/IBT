import { NEIGHBOURHOODS } from "./neighbourhoods";

// Deterministic fake orders over the last 7 days, for charts.
export function makeDemoOrders() {
  const DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const orders = [];
  let n = 1;

  for (let d = 6; d >= 0; d--) {
    const count = 2 + ((d * 3) % 5);
    for (let i = 0; i < count; i++) {
      const total = 300 + ((n * 137) % 900);
      orders.push({
        id: `demo-${n}`,
        name: "Demo customer",
        phone: "0911000000",
        address: "Demo address",
        neighbourhood: NEIGHBOURHOODS[(n * 3) % NEIGHBOURHOODS.length],
        items: [{ id: "demo", name: "Demo dish", price: total, quantity: 1 }],
        total,
        ownerId: 1 + (n % 2),
        createdAt: now - d * DAY - i * 60 * 60 * 1000,
      });
      n++;
    }
  }
  return orders;
}