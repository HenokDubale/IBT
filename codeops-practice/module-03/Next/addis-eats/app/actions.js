"use server";

import { revalidatePath } from "next/cache";
import { formFields } from "@/lib/schema";
import { parseOrder } from "@/lib/validate";
import { getSession, createOrder, getOrder, markCancelled } from "@/lib/db";

// Used with useActionState, so the first argument is the previous state.
export async function placeOrder(prevState, formData) {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      message: "Please sign in to place an order.",
      fieldErrors: {},
      values: {},
    };
  }

  // Pick only our own fields (formData also carries Next's internal keys).
  const values = {};
  for (const name of formFields)
    values[name] = String(formData.get(name) ?? "");

  const parsed = await parseOrder(values);
  if (!parsed.ok) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values, // sent back so the form can refill what the user typed
    };
  }

  await createOrder(parsed.data);

  revalidatePath("/checkout"); // refresh the "Your orders" list

  return {
    ok: true,
    message: `Order placed for ${parsed.data.name}.`,
    fieldErrors: {},
    values: {},
  };
}

// Authorisation is checked HERE, on the server. A server action is a public
// POST endpoint: hiding the button in the UI protects nothing.
export async function cancelOrder(prevState, formData) {
  const session = await getSession();
  if (!session) {
    return { ok: false, message: "Please sign in to cancel an order." };
  }

  const order = await getOrder(String(formData.get("orderId") ?? ""));
  if (!order) {
    return { ok: false, message: "Order not found." };
  }
  if (order.userId !== session.id) {
    return { ok: false, message: "You can only cancel your own orders." };
  }
  if (order.status !== "PENDING") {
    return {
      ok: false,
      message: `This order is already ${order.status.toLowerCase()}.`,
    };
  }

  await markCancelled(order.id);
  revalidatePath("/checkout");

  return { ok: true, message: "Order cancelled." };
}
