import reviews from "@/data/reviews.json";
import products from "@/data/products.json";
import StarRating from "@/components/StarRating";
import { formatDate } from "@/lib/format";

export default function AdminReviews() {
  const enriched = reviews.map((review) => ({
    ...review,
    product: products.find((p) => p.id === review.productId),
  }));

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Customer feedback</h1>
      <p className="mt-2 text-sm text-muted">
        Reviews left by buyers across your product catalogue.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {enriched.map((review) => (
          <div key={review.id} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm text-ink">{review.product?.name}</p>
                <p className="text-xs text-muted">
                  {review.buyerName} &middot; {formatDate(review.date)}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-3 text-sm text-muted">{review.comment}</p>
          </div>
        ))}

        {enriched.length === 0 && (
          <p className="text-sm text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
