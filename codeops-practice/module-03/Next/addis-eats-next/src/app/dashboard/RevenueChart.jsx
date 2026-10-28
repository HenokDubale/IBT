"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const birr = (value) => `${Number(value).toLocaleString("en-US")} birr`;
const tick = { fill: "#9ca3af", fontSize: 12 };
const tooltipStyle = { background: "#111827", border: "1px solid #374151" };

export const RevenueChart = ({ data }) => (
  <div
    className="h-72 w-full"
    role="img"
    aria-label="Bar chart of revenue in birr by neighbourhood. The same numbers are in the table below."
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="neighbourhood" tick={tick} />
        <YAxis tick={tick} tickFormatter={birr} width={100} />
        <Tooltip
          formatter={(value) => [birr(value), "Revenue"]}
          contentStyle={tooltipStyle}
        />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const OrdersChart = ({ data }) => (
  <div
    className="h-72 w-full"
    role="img"
    aria-label="Line chart of orders per day. The same numbers are in the table below."
  >
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" tick={tick} />
        <YAxis tick={tick} allowDecimals={false} width={40} />
        <Tooltip
          formatter={(value) => [value, "Orders"]}
          contentStyle={tooltipStyle}
        />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#fbbf24"
          strokeWidth={2}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
