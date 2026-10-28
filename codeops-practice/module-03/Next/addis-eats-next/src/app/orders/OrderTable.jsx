import Link from "next/link";
import { cancelOrder } from "@/app/actions";

const columns = [
  { key: "createdAt", label: "Placed" },
  { key: "neighbourhood", label: "Neighbourhood" },
  { key: "total", label: "Total" },
  { key: "status", label: "Status" },
];

const formatDate = (value) =>
  new Date(value).toLocaleString("en-GB", {
    timeZone: "Africa/Addis_Ababa",
    dateStyle: "medium",
    timeStyle: "short",
  });

const OrderTable = ({ rows, sort, dir, page, totalPages }) => {
  const href = (next) =>
    `/orders?${new URLSearchParams({ sort, dir, page: String(page), ...next })}`;

  return (
    <>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Your orders</caption>
        <thead>
          <tr className="border-b border-gray-600">
            <th scope="col" className="py-2">
              Order
            </th>
            {columns.map((col) => {
              const active = sort === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    active
                      ? dir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="py-2"
                >
                  <Link
                    href={href({
                      sort: col.key,
                      dir: active && dir === "asc" ? "desc" : "asc",
                      page: "1",
                    })}
                    className="underline"
                  >
                    {col.label}
                    {active ? (dir === "asc" ? " ▲" : " ▼") : ""}
                  </Link>
                </th>
              );
            })}
            <th scope="col" className="py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order.id} className="border-b border-gray-800">
              <th scope="row" className="py-2 font-normal">
                <Link href={`/orders/${order.id}`} className="underline">
                  #{order.id}
                </Link>
              </th>
              <td className="py-2">{formatDate(order.createdAt)}</td>
              <td className="py-2">{order.neighbourhood ?? "-"}</td>
              <td className="py-2">
                {order.total.toLocaleString("en-US")} birr
              </td>
              <td className="py-2 capitalize">{order.status}</td>
              <td className="py-2">
                {order.status === "placed" && (
                  <form action={cancelOrder.bind(null, order.id)}>
                    <button
                      type="submit"
                      className="px-2 py-1 rounded bg-red-700 text-white hover:bg-red-800"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Pagination" className="mt-4 flex items-center gap-4">
        {page > 1 ? (
          <Link href={href({ page: String(page - 1) })} className="underline">
            Previous
          </Link>
        ) : (
          <span className="text-gray-500">Previous</span>
        )}
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        {page < totalPages ? (
          <Link href={href({ page: String(page + 1) })} className="underline">
            Next
          </Link>
        ) : (
          <span className="text-gray-500">Next</span>
        )}
      </nav>
    </>
  );
};

export default OrderTable;
