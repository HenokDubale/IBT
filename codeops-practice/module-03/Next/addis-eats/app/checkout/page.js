import Link from "next/link";
import { db, getSession } from "@/lib/db";
import CheckoutForm from "./CheckoutForm";
import CancelOrderForm from "./CancelOrderForm";

// Forced dynamic. The read that needs it is getSession(): this page shows the
// signed-in user's own orders, so it must be rendered per request and never
// prebuilt. With real authentication, getSession() would read cookies(), which
// makes a page dynamic by itself. Our mock session reads nothing from the
// request, so we force it here to get the same behaviour.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();
  const allOrders = await db.order.findMany();
  const orders = session
    ? allOrders.filter((o) => o.userId === session.id).reverse()
    : [];

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <CheckoutForm />

      <h2>Your orders</h2>
      {orders.length === 0 ? (
        <p className="muted">No orders yet.</p>
      ) : (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order.id} className="order">
              <div>
                <strong>{order.name}</strong>
                <span className={`status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <p className="muted">
                  {order.phone} · {order.address}
                </p>
              </div>
              {order.status === "PENDING" && (
                <CancelOrderForm orderId={order.id} />
              )}
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link href="/menu">Back to menu</Link>
      </p>
    </div>
  );
}
