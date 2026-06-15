import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            New arrivals &mdash; June drop
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Considered objects,
            <br />
            <span className="italic text-muted">made to be used.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            A small, rotating collection of homeware, stationery, and
            accessories from independent makers across East Africa.
            Everything in stock ships within two business days.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-ink">All products</h2>
          <span className="text-sm text-muted">{products.length} items</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
