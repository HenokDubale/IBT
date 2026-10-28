import { findOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const GET = async (request, { params }) => {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;
  const order = findOrder(id);

  if (!order || (order.ownerId !== session.id && session.role !== "staff")) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(order);
};
