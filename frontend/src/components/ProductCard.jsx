import Link from "next/link";
import Image from "next/image";
import { formatKES } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-surface-raised"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full border border-line/60 bg-paper/80 px-2.5 py-1 text-xs text-muted backdrop-blur">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-base text-ink">
            {formatKES(product.price)}
          </span>
          <button
            onClick={() => addItem(product, 1)}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
