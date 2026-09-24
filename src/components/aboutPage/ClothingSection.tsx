import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import { clothingSection } from "@/data/about";

export default function ClothingSection() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-3">
              <div className="relative aspect-4/5 overflow-hidden bg-sand">
                <Image
                  src={clothingSection.image.src}
                  alt={clothingSection.image.alt}
                  fill
                  sizes="(max-width: 1023px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                {clothingSection.gallery.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative overflow-hidden bg-sand"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1023px) 40vw, 20vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="u-label mb-3 text-muted">{clothingSection.label}</p>
            <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
              {clothingSection.title}
            </h2>
            <p className="mt-5 max-w-[440px] text-[13px] leading-relaxed text-muted">
              {clothingSection.text}
            </p>
            <Link
              href={clothingSection.cta.href}
              className="u-label mt-9 inline-flex items-center gap-2 border border-ink bg-ink px-7 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
            >
              {clothingSection.cta.label}
              <ArrowIcon className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
