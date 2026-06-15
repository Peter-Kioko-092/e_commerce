import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/orders", label: "Orders" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const closeMenu = () => setOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search${searchValue ? `?q=${encodeURIComponent(searchValue)}` : ""}`);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-xl tracking-tight text-ink"
        >
          Mzizi<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-accent ${
                router.pathname === link.href ? "text-ink" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-48 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink placeholder:text-muted focus:border-accent"
            />
          </form>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {user ? (
            <button
              onClick={signOut}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Log in
            </Link>
          )}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Cart
            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative flex items-center">
            Menu
            {itemCount > 0 && (
              <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-paper px-4 pb-4 pt-2 md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-2 mt-2">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent"
            />
          </form>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface"
              >
                Cart {itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-ink hover:bg-surface"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface"
                >
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
