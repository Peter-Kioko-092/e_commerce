import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted">
          Browse the shop and add something you&apos;ll actually use.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Your cart</h1>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 sm:gap-6"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-raised sm:h-24 sm:w-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/products/${item.id}`}
                  className="font-display text-base text-ink hover:text-accent sm:text-lg"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-muted">{formatKES(item.price)}</p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 sm:mt-0 sm:gap-6">
                <div className="inline-flex items-center rounded-full border border-line">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-ink transition-colors hover:text-accent"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    &minus;
                  </button>
                  <span className="min-w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-ink transition-colors hover:text-accent"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-muted transition-colors hover:text-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 flex flex-col items-stretch gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Subtotal</p>
          <p className="font-display text-2xl text-ink">{formatKES(subtotal)}</p>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-accent px-8 py-3 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
