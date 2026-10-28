"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { orderSchema } from "@/lib/schema";
import { addOrder, findOrder, cancelOrderById } from "@/lib/orders";
import { createSession, getSession, deleteSession } from "@/lib/session";
import { getSafeNext } from "@/lib/safe-redirect";
import { getDish } from "@/app/menu/data";
import {
  getCart,
  addLine,
  decreaseLine,
  removeLine,
  clearCart,
  cartTotal,
} from "@/lib/carts";
import { registerSchema } from "@/lib/schema";
import { findUserByUsername, verifyPassword, createUser } from "@/lib/users";

export async function signIn(prevState, formData) {
  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = getSafeNext(formData.get("next"));

  const user = findUserByUsername(username);

  if (!user || !verifyPassword(password, user.password)) {
    return { error: "Invalid username or password", username };
  }

  await createSession(user.id);
  redirect(next);
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}

// ---------- Cart ----------

export async function addToCart(dishId) {
  const session = await getSession();
  if (!session) redirect("/signin?next=/menu");

  // The name and price come from the server's menu, never from the browser.
  const dish = await getDish(dishId);
  if (!dish) {
    return { success: false, error: "Dish not found" };
  }

  addLine(session.id, dish);
  revalidatePath("/cart");
  return { success: true };
}

export async function decreaseCartItem(dishId) {
  const session = await getSession();
  if (!session) redirect("/signin?next=/cart");

  decreaseLine(session.id, dishId);
  revalidatePath("/cart");
}

export async function removeCartItem(dishId) {
  const session = await getSession();
  if (!session) redirect("/signin?next=/cart");

  removeLine(session.id, dishId);
  revalidatePath("/cart");
}

// ---------- Orders ----------

export async function placeOrder(prevState, formData) {
  const data = Object.fromEntries(formData);

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: "Please sign in to place an order.",
      values: data,
    };
  }

  // The items come from this user's cart on the server, not from the form.
  const cart = getCart(session.id);
  if (cart.length === 0) {
    return { success: false, error: "Your cart is empty.", values: data };
  }

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return { success: false, fieldErrors, values: data };
  }

  const { name, phone, address } = result.data;

  const order = addOrder({
    name,
    phone,
    address,
    neighbourhood: result.data.neighbourhood,
    items: cart,
    total: cartTotal(cart),
    ownerId: session.id,
  });

  clearCart(session.id);
  revalidatePath("/cart");
  revalidatePath("/orders");

  // redirect must be last: it works by throwing.
  redirect(`/orders/${order.id}`);
}

export async function cancelOrder(orderId) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Not signed in" };
  }

  const order = findOrder(orderId);
  if (!order) {
    return { success: false, error: "Order not found" };
  }

  if (order.ownerId !== session.id) {
    return { success: false, error: "Not allowed" };
  }

  if (order.status !== "placed") {
    return { success: false, error: "This order can no longer be cancelled" };
  }

  cancelOrderById(orderId);
  revalidatePath("/orders");
  return { success: true };
}

export async function register(prevState, formData) {
  const data = Object.fromEntries(formData);
  const next = getSafeNext(formData.get("next"), "/menu");

  const result = registerSchema.safeParse(data);

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    // Never send the password back to the form.
    return { fieldErrors, values: { username: String(data.username ?? "") } };
  }

  const { username, password } = result.data;

  if (findUserByUsername(username)) {
    return {
      fieldErrors: { username: ["That username is already taken"] },
      values: { username },
    };
  }

  const user = createUser({ username, password });
  await createSession(user.id); // signed in straight after registering
  redirect(next);
}
