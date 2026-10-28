"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const OrderStatus = ({ order }) => {
  const { data, error } = useSWR(`/api/orders/${order.id}`, fetcher, {
    fallbackData: order,
    // Poll every 5 seconds, but stop once the order has finished.
    refreshInterval: (latest) =>
      latest?.status === "delivered" || latest?.status === "cancelled"
        ? 0
        : 5000,
  });

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <p className="text-sm text-gray-400">Status (updates every 5 seconds)</p>
      <p className="text-2xl font-bold text-blue-400">{data.status}</p>
      {error && (
        <p className="mt-2 text-sm text-red-400">
          Could not refresh the status. Showing the last known value.
        </p>
      )}
    </div>
  );
};

export default OrderStatus;
