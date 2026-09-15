import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import { toysCollection } from "@/data/home";
import { Product } from "@/types/product";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import ProductCarousel from "./ProductCarousel";

export default function ToysCollection({ products }: { products: Product[] }) {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <SectionHeading
          label={toysCollection.label}
          title={toysCollection.title}
          href={toysCollection.href}
        />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,9fr)] lg:gap-10">
          <Link
            href={toysCollection.href}
            className="group/banner relative block aspect-4/5 overflow-hidden bg-sand sm:aspect-16/11 lg:aspect-auto"
          >
            {/* Anchored to the bottom: the source photo has a caption baked
                into its top edge, which this crop leaves out. */}
            <div className="absolute -inset-px transform-gpu transition-transform duration-[900ms] ease-out group-hover/banner:scale-[1.03]">
              <Image
                src={toysCollection.image.src}
                alt={toysCollection.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 30vw"
                className="object-cover object-bottom"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 via-ink/55 to-transparent p-6 pt-28 text-bg">
              <p className="u-display text-[26px] leading-[1.15]">
                {toysCollection.caption}
              </p>
              <p className="mt-3 max-w-[320px] text-[12px] leading-relaxed text-bg/80">
                {toysCollection.text}
              </p>
              <span className="u-label mt-5 inline-flex items-center gap-2">
                Дивитись добірку
                <ArrowIcon className="size-4 transition-transform duration-500 group-hover/banner:translate-x-1" />
              </span>
            </div>
          </Link>

          <ProductCarousel
            products={products}
            label={toysCollection.label}
            perView={3}
          />
        </div>
      </Container>
    </section>
  );
}
