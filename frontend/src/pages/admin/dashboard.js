import products from "@/data/products.json";
import orders from "@/data/orders.json";
import { formatKES } from "@/lib/format";

export default function AdminDashboard() {
  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 8);

  const cards = [
    { label: "Total products", value: totalProducts },
    { label: "Pending orders", value: pendingOrders },
    { label: "Revenue this month", value: formatKES(revenue) },
    { label: "Low stock items", value: lowStock.length },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        A snapshot of your storefront based on current mock data.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs uppercase tracking-wide text-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="font-display text-xl text-ink">Low stock alert</h2>
        {lowStock.length === 0 ? (
          <p className="mt-3 text-sm text-muted">All products are well stocked.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <span className="text-ink">{p.name}</span>
                <span className="text-warning">{p.stock} left</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
