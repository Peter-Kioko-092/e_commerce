import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success
  const [error, setError] = useState("");

  const handlePay = (e) => {
    e.preventDefault();
    setError("");

    const phoneRegex = /^(?:\+254|0)[71]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError("Enter a valid M-Pesa number, e.g. 0712345678");
      return;
    }

    setStatus("processing");

    // Mock STK push delay — replaced with real Daraja API call in backend phase
    setTimeout(() => {
      setStatus("success");
      clearCart();
    }, 1800);
  };

  if (items.length === 0 && status !== "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl text-ink">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted">
          Your cart is empty. Add a product before checking out.
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

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-3xl text-success">
          &#10003;
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink">
          Payment received
        </h1>
        <p className="mt-3 text-sm text-muted">
          We&apos;ve sent an M-Pesa confirmation to {phone}. Your order is now
          being prepared for dispatch.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/orders"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            View order status
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Order summary */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          <h2 className="mb-4 font-display text-xl text-ink">Order summary</h2>
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-ink">
                  {item.name} <span className="text-muted">&times; {item.quantity}</span>
                </span>
                <span className="text-muted">
                  {formatKES(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-line pt-3 font-display text-lg">
              <span className="text-ink">Total</span>
              <span className="text-ink">{formatKES(subtotal)}</span>
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className="order-1 lg:order-2">
          <h2 className="mb-4 font-display text-xl text-ink">Pay with M-Pesa</h2>
          <form
            onSubmit={handlePay}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5"
          >
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm text-muted">
                M-Pesa phone number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712345678"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
              />
              {error && <p className="mt-2 text-xs text-danger">{error}</p>}
            </div>

            <p className="text-xs text-muted">
              You&apos;ll receive an STK push prompt on your phone to confirm
              this payment of {formatKES(subtotal)}.
            </p>

            <button
              type="submit"
              disabled={status === "processing"}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "processing" ? "Waiting for confirmation..." : "Pay now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
