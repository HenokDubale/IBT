import { makeDemoOrders } from "./demo-orders";

// One shared array, even if Next.js loads this file more than once.

const globalForOrders = globalThis;

if (!globalThis.__orders) {
  globalThis.__orders =
    process.env.SEED_DEMO === "true" ? makeDemoOrders() : [];
}


export const orders = globalForOrders.__orders;

export function getOrderStatus(order) {
  if (order.status === "cancelled") return "cancelled";

  const age = (Date.now() - order.id) / 1000; // id came from Date.now()

  if (age < 10) return "placed";
  if (age < 20) return "preparing";
  if (age < 30) return "on the way";
  return "delivered";
}

const withStatus = (order) => ({ ...order, status: getOrderStatus(order) });

export function addOrder(order) {
  const newOrder = { ...order, id: Date.now(), status: "placed" };
  orders.push(newOrder);
  return newOrder;
}

export function findOrder(id) {
  const order = orders.find((o) => o.id === Number(id));
  return order ? withStatus(order) : undefined;
}

// Only this user's orders.
export function ordersForUser(userId) {
  return orders.filter((o) => o.ownerId === userId).map(withStatus);
}

// Staff only: every order.
export function allOrders() {
  return orders.map(withStatus);
}

// Changes the stored order, not a copy.
export function cancelOrderById(id) {
  const order = orders.find((o) => o.id === Number(id));
  if (order) order.status = "cancelled";
  return order;
}
