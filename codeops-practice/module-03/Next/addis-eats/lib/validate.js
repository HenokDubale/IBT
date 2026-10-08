import { orderSchema } from "./schema";
import { db } from "./db";

export async function parseOrder(input) {
  const result = orderSchema.safeParse(input);
  if (!result.success) {
    return { ok: false, fieldErrors: toFieldErrors(result.error) };
  }

  const { dishId } = result.data;
  if (dishId) {
    const dish = await db.dish.findUnique({ where: { id: dishId } });
    if (!dish) {
      return {
        ok: false,
        fieldErrors: { dishId: ["That dish does not exist"] },
      };
    }
    if (!dish.available) {
      return {
        ok: false,
        fieldErrors: { dishId: ["That dish is not available right now"] },
      };
    }
  }

  return { ok: true, data: result.data };
}

function toFieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (out[key] ??= []).push(issue.message);
  }
  return out;
}
