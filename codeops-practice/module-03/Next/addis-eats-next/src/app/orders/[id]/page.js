import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findOrder } from "@/lib/orders";
import OrderStatus from "./OrderStatus";

const OrderPage = async ({ params }) => {
  const { id } = await params;

  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);
  }

  const order = findOrder(id);

  // Not yours (and you are not staff): show "not found", so nobody can
  // learn that someone else's order exists.
  if (!order || (order.ownerId !== session.id && session.role !== "staff")) {
    notFound();
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-5xl mb-4">Order #{order.id}</h1>
      <p>Name: {order.name}</p>
      <p>Address: {order.address}</p>
      <h2 className="mt-4 mb-1 font-bold">Items</h2>
      <ul>
        {order.items?.map((line) => (
          <li key={line.id}>
            {line.quantity} x {line.name} ({line.price * line.quantity} birr)
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold">Total: {order.total} birr</p>

      <OrderStatus order={order} />

      <Link href="/orders" className="inline-block mt-4">
        Back to orders
      </Link>
    </div>
  );
};

export default OrderPage;
