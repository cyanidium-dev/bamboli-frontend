import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import { CategoryTile } from "@/data/home";

/** 2×2 grid on mobile, a single row from `lg` up. */
export default function CategoryStrip({
  categories,
}: {
  categories: CategoryTile[];
}) {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <SectionHeading
          label="Категорії"
          title="Одяг та іграшки для маленьких мрійників"
          href="/catalog"
          hrefLabel="Каталог"
        />

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
          {categories.map((category, index) => (
            <Link key={category.slug} href={category.href} className="group/tile block">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-sand">
                <div className="absolute -inset-px transform-gpu transition-transform duration-[900ms] ease-out group-hover/tile:scale-[1.04]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 1023px) 50vw, 25vw"
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
          ))}
        </div>
      </Container>
    </section>
  );
}
