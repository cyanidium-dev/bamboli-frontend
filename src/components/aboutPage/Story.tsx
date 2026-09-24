import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { story } from "@/data/about";

export default function Story() {
  return (
    <section className="pt-24 lg:pt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div className="absolute inset-0 hidden -translate-x-5 -translate-y-5 border border-clay/40 lg:block" />
              <div className="relative aspect-4/5 w-full overflow-hidden bg-sand lg:aspect-auto lg:h-[560px]">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="relative lg:col-span-6 lg:pl-6">
            <span
              aria-hidden
              className="u-display pointer-events-none absolute -top-8 right-0 hidden select-none text-[140px] leading-none text-line lg:block"
            >
              02
            </span>

            <div className="relative flex h-full flex-col justify-center">
              <p className="u-label mb-3 text-clay">{story.label}</p>
              <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[38px]">
                {story.title}
              </h2>
              <div className="mt-6 space-y-4 text-[13px] leading-relaxed text-muted">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
