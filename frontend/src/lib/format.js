export function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const STATUS_STYLES = {
  pending: "bg-warning/15 text-warning border-warning/30",
  paid: "bg-accent-soft text-accent border-accent/30",
  dispatched: "bg-accent-soft text-accent border-accent/30",
  delivered: "bg-success/15 text-success border-success/30",
};

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
