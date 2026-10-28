import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { allOrders } from "@/lib/orders";

const Kitchen = async () => {
  const session = await getSession();
  if (!session) redirect("/signin?next=/kitchen");

  // The role is checked on the server, so hiding a link is not what protects this.
  if (session.role !== "staff") {
    return (
      <div className="w-full px-6">
        <h1 className="text-red-500 text-4xl mb-4">Staff only</h1>
        <p>You do not have permission to view the kitchen.</p>
      </div>
    );
  }

  const orders = allOrders();

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-5xl mb-4">Kitchen</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-lg font-bold">Order #{order.id}</p>
              <p>Customer: {order.name}</p>
              <p>Address: {order.address}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Kitchen;