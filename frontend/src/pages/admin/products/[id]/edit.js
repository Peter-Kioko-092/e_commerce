import { useRouter } from "next/router";
import products from "@/data/products.json";
import ProductForm from "@/components/admin/ProductForm";

export function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const product = products.find((p) => p.id === params.id) || null;
  return { props: { product } };
}

export default function EditProductPage({ product }) {
  const router = useRouter();

  if (!product) {
    return (
      <div>
        <h1 className="font-display text-3xl text-ink">Product not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Edit product</h1>
      <p className="mt-2 text-sm text-muted">Update details for {product.name}.</p>

      <div className="mt-8 max-w-2xl">
        <ProductForm
          initialValues={{
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            image: product.image,
            description: product.description,
          }}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
