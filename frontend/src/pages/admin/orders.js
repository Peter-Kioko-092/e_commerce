import { useState } from "react";
import ordersData from "@/data/orders.json";
import { formatKES, formatDate, STATUS_STYLES } from "@/lib/format";

const STATUS_LABELS = {
  pending: "Pending",
  paid: "Paid",
  dispatched: "Dispatched",
  delivered: "Delivered",
};

const NEXT_STATUS = {
  pending: "dispatched",
  dispatched: "delivered",
  delivered: null,
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(ordersData);

  const advanceStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        const next = NEXT_STATUS[order.status];
        return next ? { ...order, status: next } : order;
      })
    );
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Orders</h1>
      <p className="mt-2 text-sm text-muted">
        Track and dispatch incoming customer orders.
      </p>

      {/* Desktop table */}
      <div className="mt-8 hidden overflow-hidden rounded-2xl border border-line lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-4 py-3 text-ink">{order.id}</td>
                <td className="px-4 py-3 text-muted">{formatDate(order.date)}</td>
                <td className="px-4 py-3 text-muted">{order.items.length} item(s)</td>
                <td className="px-4 py-3 text-ink">{formatKES(order.total)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {NEXT_STATUS[order.status] ? (
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Mark as {STATUS_LABELS[NEXT_STATUS[order.status]]}
                    </button>
                  ) : (
                    <span className="text-xs text-muted">Complete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-8 flex flex-col gap-3 lg:hidden">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink">{order.id}</p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
              >
                {STATUS_LABELS[order.status]}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">{formatDate(order.date)}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted">{order.items.length} item(s)</span>
              <span className="text-ink">{formatKES(order.total)}</span>
            </div>
            {NEXT_STATUS[order.status] && (
              <button
                onClick={() => advanceStatus(order.id)}
                className="mt-3 w-full rounded-full border border-line px-3 py-2 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Mark as {STATUS_LABELS[NEXT_STATUS[order.status]]}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
