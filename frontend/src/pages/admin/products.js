import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import productsData from "@/data/products.json";
import { formatKES } from "@/lib/format";

export default function AdminProducts() {
  const [products, setProducts] = useState(productsData);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">Products</h1>
          <p className="mt-2 text-sm text-muted">
            Manage your storefront listings.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Add product
        </Link>
      </div>

      {/* Desktop table */}
      <div className="mt-8 hidden overflow-hidden rounded-2xl border border-line lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-surface-raised">
                    <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <span className="text-ink">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="px-4 py-3 text-ink">{formatKES(p.price)}</td>
                <td className="px-4 py-3 text-muted">{p.stock}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-danger hover:text-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-8 flex flex-col gap-3 lg:hidden">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-surface-raised">
                <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm text-ink">{p.name}</p>
                <p className="text-xs text-muted">{p.category}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-ink">{formatKES(p.price)}</span>
              <span className="text-muted">{p.stock} in stock</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="flex-1 rounded-full border border-line px-3 py-1.5 text-center text-xs text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-danger hover:text-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-8 text-sm text-muted">
          No products yet. Add your first listing to get started.
        </p>
      )}
    </div>
  );
}
