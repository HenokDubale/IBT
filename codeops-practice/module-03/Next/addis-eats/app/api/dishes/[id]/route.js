import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/http";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await db.dish.findUnique({ where: { id } });

  if (!dish) {
    return errorResponse(404, "dish_not_found", `No dish with id "${id}".`);
  }

  return NextResponse.json({ dish });
}