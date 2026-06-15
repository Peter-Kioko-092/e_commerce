import Link from "next/link";
import orders from "@/data/orders.json";
import { formatKES, formatDate, STATUS_STYLES } from "@/lib/format";

const STATUS_LABELS = {
  pending: "Pending",
  paid: "Paid",
  dispatched: "Dispatched",
  delivered: "Delivered",
};

const STATUS_STEPS = ["pending", "dispatched", "delivered"];

function OrderProgress({ status }) {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="mt-4 flex items-center gap-2">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex flex-1 items-center gap-2">
          <div
            className={`h-2 flex-1 rounded-full ${
              i <= currentIndex ? "bg-accent" : "bg-line"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl text-ink">No orders yet</h1>
        <p className="mt-3 text-sm text-muted">
          Once you place an order, you&apos;ll be able to track it here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Your orders</h1>

      <div className="mt-8 flex flex-col gap-5">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-lg text-ink">{order.id}</p>
                <p className="text-xs text-muted">{formatDate(order.date)}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
              >
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            <OrderProgress status={order.status} />

            <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
              {order.items.map((item) => (
                <li key={item.productId} className="flex justify-between">
                  <span>
                    {item.name} &times; {item.quantity}
                  </span>
                  <span>{formatKES(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-base text-ink">
                {formatKES(order.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
