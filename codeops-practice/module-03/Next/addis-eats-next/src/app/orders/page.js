import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ordersForUser } from "@/lib/orders";
import { getTableData } from "@/lib/dashboard";
import OrderTable from "./OrderTable";

export const metadata = {
  title: "Your orders",
  description: "Track your current and past orders.",
  robots: { index: false },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const OrdersPage = async ({ searchParams }) => {
  const session = await getSession();
  if (!session) redirect("/signin?next=/orders");

  const { sort, dir, page, state } = await searchParams;

  // Dev-only switches to force each state: ?state=loading | empty | error
  const forced = process.env.NODE_ENV === "production" ? undefined : state;
  if (forced === "loading") await sleep(3000);
  if (forced === "error") throw new Error("Forced orders error");

  const orders = forced === "empty" ? [] : ordersForUser(session.id);

  if (orders.length === 0) {
    return (
      <div className="w-full px-6">
        <h1 className="text-blue-500 text-4xl mb-2">Your orders</h1>
        <p className="text-gray-300">You have not placed any orders yet.</p>
        <Link href="/menu" className="inline-block mt-3 underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  const table = getTableData(orders, { sort, dir, page });

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-4xl mb-4">Your orders</h1>
      <OrderTable {...table} />
    </div>
  );
};

export default OrdersPage;