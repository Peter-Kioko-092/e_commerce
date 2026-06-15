import { useState } from "react";

export default function ReviewForm({ productName, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmit?.({ rating, comment: comment.trim() });
    setSubmitted(true);
    setComment("");
    setRating(5);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-success">
        Thanks &mdash; your review for {productName} has been submitted.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm text-muted">Your rating</label>
        <div className="flex gap-1 text-2xl">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const active = value <= (hoverRating || rating);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className={`transition-colors ${active ? "text-accent" : "text-line"}`}
                aria-label={`Rate ${value} out of 5`}
              >
                &#9733;
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="mb-2 block text-sm text-muted">
          Your review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder={`Share what you thought about ${productName}...`}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
        />
      </div>

      <button
        type="submit"
        className="self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
      >
        Submit review
      </button>
    </form>
  );
}
