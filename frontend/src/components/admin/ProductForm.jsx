import { useState } from "react";
import { useRouter } from "next/router";

const CATEGORIES = [
  "Home & Kitchen",
  "Home & Living",
  "Art & Prints",
  "Stationery",
  "Bags",
  "Games",
  "Food & Drink",
  "Apparel",
];

export default function ProductForm({ initialValues, submitLabel = "Save product" }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initialValues || {
      name: "",
      category: CATEGORIES[0],
      price: "",
      stock: "",
      image: "",
      description: "",
    }
  );
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet — this UI is ready for the MongoDB-backed API in a later phase.
    setSaved(true);
    setTimeout(() => router.push("/admin/products"), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Product name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder="e.g. Ceramic Pour-Over Set"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-sm text-muted">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={handleChange("category")}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink focus:border-accent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="mb-2 block text-sm text-muted">
            Price (KES)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            required
            value={form.price}
            onChange={handleChange("price")}
            placeholder="e.g. 4200"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-2 block text-sm text-muted">
            Stock quantity
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={handleChange("stock")}
            placeholder="e.g. 14"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-2 block text-sm text-muted">
          Image URL
        </label>
        <input
          id="image"
          type="url"
          required
          value={form.image}
          onChange={handleChange("image")}
          placeholder="https://..."
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
        />
      </div>

      {form.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={form.image}
          alt="Preview"
          className="h-40 w-40 rounded-xl border border-line object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
          onLoad={(e) => (e.currentTarget.style.display = "block")}
        />
      )}

      <div>
        <label htmlFor="description" className="mb-2 block text-sm text-muted">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          required
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Describe the product..."
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
        />
      </div>

      {saved && (
        <p className="text-sm text-success">Saved &mdash; redirecting to products...</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
