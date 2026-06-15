import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || "");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase().trim());
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Search products</h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name..."
          className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-ink placeholder:text-muted focus:border-accent sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                category === cat
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Nothing matches that search. Try a different keyword or category.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
