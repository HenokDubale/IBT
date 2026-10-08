import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .regex(
      /^(09|\+2519)\d{8}$/,
      "Phone number must start with 09… or +2519… followed by 8 digits",
    ),
  address: z
    .string({ error: "Address is required" })
    .trim()
    .min(5, "Address must be at least 5 characters"),
  // Optional extras (the API can send them; the checkout form does not)
  dishId: z.string().optional(),
  quantity: z.coerce
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(20, "Maximum 20 per order")
    .default(1),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});

// The checkout form only has these three inputs.
export const formFields = ["name", "phone", "address"];
