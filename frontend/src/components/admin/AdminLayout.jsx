import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink lg:flex-row">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 lg:hidden">
        <Link href="/admin/dashboard" className="font-display text-lg text-ink">
          Mzizi<span className="text-accent"> Seller</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-line px-3 py-1.5 text-sm"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`border-b border-line bg-surface lg:block lg:w-60 lg:flex-shrink-0 lg:border-b-0 lg:border-r ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="hidden px-6 py-6 lg:block">
          <Link href="/admin/dashboard" className="font-display text-lg text-ink">
            Mzizi<span className="text-accent"> Seller</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-3 lg:px-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                router.pathname === item.href
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface-raised hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="mt-2 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-ink"
          >
            &larr; Back to storefront
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  );
}
