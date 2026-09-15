import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import { Category } from "@/types/product";

/** Seven tiles: a swipeable row on phones and tablets, one row on desktop. */
export default function CategoryStrip({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <SectionHeading
          label="Категорії"
          title="Усе для дитини в одному стилі"
          href="/catalog"
          hrefLabel="Каталог"
        />

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0">
          {categories.map((category, index) => (
            <li
              key={category.slug}
              className="w-[40vw] shrink-0 snap-start sm:w-[28vw] lg:w-auto"
            >
              <Link
                href={`/catalog/${category.slug}`}
                className="group/tile block"
              >
                <div className="relative aspect-3/4 w-full overflow-hidden bg-sand">
                  <div className="absolute -inset-px transform-gpu transition-transform duration-[900ms] ease-out group-hover/tile:scale-[1.04]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 639px) 40vw, (max-width: 1023px) 28vw, 14vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/5 transition-opacity duration-700 group-hover/tile:opacity-0" />
                </div>
                <h3 className="u-label mt-3 transition-colors group-hover/tile:text-clay">
                  {category.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[11px] text-muted">
                  {category.caption}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
