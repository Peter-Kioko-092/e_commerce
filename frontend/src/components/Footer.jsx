import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg text-ink">
              Mzizi<span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Considered objects for everyday use, sourced from independent
              makers across East Africa.
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                Shop
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-ink hover:text-accent">
                    All products
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-ink hover:text-accent">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-ink hover:text-accent">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/orders" className="text-ink hover:text-accent">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-ink hover:text-accent"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-ink hover:text-accent"
                  >
                    Create account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          &copy; {new Date().getFullYear()} Mzizi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
