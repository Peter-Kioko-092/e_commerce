import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Add product</h1>
      <p className="mt-2 text-sm text-muted">
        List a new item in your storefront.
      </p>

      <div className="mt-8 max-w-2xl">
        <ProductForm submitLabel="Add product" />
      </div>
    </div>
  );
}
