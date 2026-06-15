export default function StarRating({ rating, size = "text-sm" }) {
  const full = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-0.5 ${size}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-accent" : "text-line"}>
          &#9733;
        </span>
      ))}
    </span>
  );
}
