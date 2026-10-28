import { z } from "zod";
import { orderSchema } from "@/lib/schema";
import { addOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return Response.json(
      { error: "Validation failed", fieldErrors },
      { status: 422 },
    );
  }

  // The owner comes from the session, never from the request body.
  const order = addOrder({ ...result.data, ownerId: session.id });
  return Response.json(order, { status: 201 });
}
