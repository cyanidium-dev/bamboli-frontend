import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/shared/productCard/ProductCard";
import ScrollRow from "@/components/shared/ui/ScrollRow";

const widths = {
  4: "w-[44vw] sm:w-[36vw] md:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]",
  3: "w-[44vw] sm:w-[36vw] md:w-[calc((100%-40px)/3)]",
};

export default function ProductCarousel({
  products,
  label,
  perView = 4,
  className,
}: {
  products: Product[];
  label: string;
  perView?: 3 | 4;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <ScrollRow label={label} itemClassName={widths[perView]}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollRow>
    </div>
  );
}
