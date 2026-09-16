import { Product } from "@/types/product";
import ProductCard from "@/components/shared/productCard/ProductCard";

/** Inline product mention inside the article body — marketing-structure.md §3.11. */
export default function ArticleProductEmbed({ product }: { product: Product }) {
  return (
    <div className="not-prose my-2 max-w-[280px] border border-line p-4">
      <p className="u-label mb-4 text-muted">Згадано в статті</p>
      <ProductCard product={product} />
    </div>
  );
}
