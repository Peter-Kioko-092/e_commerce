import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import reviewsData from "@/data/reviews.json";
import { formatKES } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import StarRating from "@/components/StarRating";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";

export function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const product = products.find((p) => p.id === params.id);
  const reviews = reviewsData.filter((r) => r.productId === params.id);

  return {
    props: { product, reviews },
  };
}

export default function ProductDetail({ product, reviews: initialReviews }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(initialReviews);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleReviewSubmit = ({ rating, comment }) => {
    setReviews((prev) => [
      {
        id: `local-${Date.now()}`,
        productId: product.id,
        buyerName: "You",
        rating,
        comment,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link href="/" className="text-sm text-muted hover:text-accent">
        &larr; Back to shop
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-muted">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={avgRating} />
            <span className="text-sm text-muted">
              {avgRating.toFixed(1)} ({reviews.length} review
              {reviews.length === 1 ? "" : "s"})
            </span>
          </div>

          <p className="mt-5 font-display text-2xl text-ink">
            {formatKES(product.price)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {product.description}
          </p>

          <p className="mt-4 text-sm text-muted">
            {product.stock > 0 ? (
              <span className="text-success">
                In stock &mdash; {product.stock} available
              </span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-line">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg text-ink transition-colors hover:text-accent"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="min-w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 text-lg text-ink transition-colors hover:text-accent"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {added ? "Added to cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 font-display text-2xl text-ink">Reviews</h2>
          <ReviewList reviews={reviews} />
        </div>
        <div>
          <h2 className="mb-6 font-display text-2xl text-ink">
            Write a review
          </h2>
          <ReviewForm productName={product.name} onSubmit={handleReviewSubmit} />
        </div>
      </section>
    </div>
  );
}
