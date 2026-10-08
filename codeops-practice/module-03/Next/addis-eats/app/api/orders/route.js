import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/http";
import { getSession, createOrder } from "@/lib/db";
import { parseOrder } from "@/lib/validate";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return errorResponse(401, "unauthenticated", "You must be signed in to place an order.");
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "invalid_json", "The request body must be valid JSON.");
  }

  const parsed = await parseOrder(body);
  if (!parsed.ok) {
    return errorResponse(422, "validation_failed", "Some fields are invalid.", parsed.fieldErrors);
  }

  const order = await createOrder(parsed.data);
  return NextResponse.json({ order }, { status: 201 });
}