import { getSession } from "@/lib/session";

// Returns only the caller's own info, never a password hash.
export async function GET() {
  const session = await getSession();
  return Response.json({ user: session });
}
