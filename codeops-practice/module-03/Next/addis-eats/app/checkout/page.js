import { headers } from "next/headers";

// Force dynamic evaluation on every request
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "Unknown";

  return (
    <div>
      <h1>Checkout</h1>
      <p>Dynamic route evaluated per request.</p>
      <small>User Agent: {userAgent}</small>
    </div>
  );
}
