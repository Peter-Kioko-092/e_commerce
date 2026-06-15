import StarRating from "./StarRating";
import { formatDate } from "@/lib/format";

export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return (
      <p className="text-sm text-muted">
        No reviews yet. Be the first to share your thoughts on this product.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-6">
      {reviews.map((review) => (
        <li key={review.id} className="border-b border-line pb-6 last:border-none last:pb-0">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-ink">{review.buyerName}</p>
            <span className="text-xs text-muted">{formatDate(review.date)}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-sm text-muted">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
