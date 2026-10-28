import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { allOrders } from "@/lib/orders";
import { ordersPerDay, revenueByNeighbourhood } from "@/lib/dashboard";
import { OrdersChart, RevenueChart } from "./RevenueChart";

export const metadata = {
  title: "Dashboard",
  description: "Revenue and orders overview for staff.",
  robots: { index: false },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const birr = (n) => `${n.toLocaleString("en-US")} birr`;

const DashboardPage = async ({ searchParams }) => {
  const session = await getSession();
  if (!session) redirect("/signin?next=/dashboard");

  if (session.role !== "staff") {
    return (
      <div className="w-full px-6">
        <h1 className="text-blue-500 text-4xl mb-2">Staff only</h1>
        <p>You do not have access to the dashboard.</p>
      </div>
    );
  }

  // Dev-only switches to force each state: ?state=loading | empty | error
  const { state } = await searchParams;
  const forced = process.env.NODE_ENV === "production" ? undefined : state;
  if (forced === "loading") await sleep(3000);
  if (forced === "error") throw new Error("Forced dashboard error");

  const orders = forced === "empty" ? [] : allOrders();

  if (orders.length === 0) {
    return (
      <div className="w-full px-6">
        <h1 className="text-blue-500 text-4xl mb-2">Dashboard</h1>
        <p className="text-gray-300">
          No orders yet. Charts will appear after the first order is placed.
        </p>
        <Link href="/menu" className="inline-block mt-3 underline">
          Go to the menu
        </Link>
      </div>
    );
  }

  // Aggregate here, so only small summaries reach the browser.
  const revenue = revenueByNeighbourhood(orders);
  const perDay = ordersPerDay(orders, 7);
  const range = `${perDay[0].day} to ${perDay[perDay.length - 1].day}`;

  return (
    <div className="w-full px-6 space-y-10">
      <h1 className="text-blue-500 text-4xl">Dashboard</h1>

      <section>
        <h2 className="text-2xl mb-2">Revenue by neighbourhood (birr)</h2>
        <RevenueChart data={revenue} />
        <table className="mt-4 w-full max-w-md text-left text-sm">
          <caption className="sr-only">
            Revenue by neighbourhood in birr
          </caption>
          <thead>
            <tr className="border-b border-gray-600">
              <th scope="col" className="py-1">
                Neighbourhood
              </th>
              <th scope="col" className="py-1">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((row) => (
              <tr key={row.neighbourhood} className="border-b border-gray-800">
                <th scope="row" className="py-1 font-normal">
                  {row.neighbourhood}
                </th>
                <td className="py-1">{birr(row.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl mb-2">
          Orders per day, {range} (number of orders)
        </h2>
        <OrdersChart data={perDay} />
        <table className="mt-4 w-full max-w-md text-left text-sm">
          <caption className="sr-only">Orders per day, {range}</caption>
          <thead>
            <tr className="border-b border-gray-600">
              <th scope="col" className="py-1">
                Day
              </th>
              <th scope="col" className="py-1">
                Orders
              </th>
            </tr>
          </thead>
          <tbody>
            {perDay.map((row) => (
              <tr key={row.day} className="border-b border-gray-800">
                <th scope="row" className="py-1 font-normal">
                  {row.day}
                </th>
                <td className="py-1">{row.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardPage;
