import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import { toysSection } from "@/data/about";

export default function ToysSection() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="u-label mb-3 text-muted">{toysSection.label}</p>
            <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
              {toysSection.title}
            </h2>
            <p className="mt-5 max-w-[440px] text-[13px] leading-relaxed text-muted">
              {toysSection.text}
            </p>
            <Link
              href={toysSection.cta.href}
              className="u-label mt-9 inline-flex items-center gap-2 border border-ink bg-ink px-7 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
            >
              {toysSection.cta.label}
              <ArrowIcon className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-3">
              <div className="relative aspect-4/5 overflow-hidden bg-sand">
                <Image
                  src={toysSection.image.src}
                  alt={toysSection.image.alt}
                  fill
                  sizes="(max-width: 1023px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                {toysSection.gallery.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative overflow-hidden bg-sand"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1023px) 40vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
