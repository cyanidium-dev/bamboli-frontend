import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import { toysSection } from "@/data/about";
import Button from "@/components/shared/ui/Button";
import Section from "@/components/shared/ui/Section";

export default function ToysSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="u-label mb-3 text-muted">{toysSection.label}</p>
            <h2 className="u-h2">
              {toysSection.title}
            </h2>
            <p className="mt-5 max-w-[380px] u-body">
              {toysSection.text}
            </p>
            <Button href={toysSection.cta.href} className="mt-9">
              {toysSection.cta.label}
              <ArrowIcon className="size-4" />
            </Button>
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
    </Section>
  );
}
