import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { showroom } from "@/data/about";
import { siteInfo } from "@/data/siteInfo";
import Section from "@/components/shared/ui/Section";
import Button from "@/components/shared/ui/Button";

export default function Showroom() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="grid overflow-hidden bg-ink text-bg md:grid-cols-2">
            <div className="relative aspect-4/5 w-full md:aspect-auto md:min-h-[520px]">
              <Image
                src={showroom.image.src}
                alt={showroom.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
              <p className="u-label mb-5 text-bg/60">{showroom.label}</p>
              <h2 className="u-h2 max-w-[420px]">
                {showroom.title}
              </h2>
              <p className="u-body mt-6 max-w-[380px] text-bg/70">
                {showroom.text}
              </p>

              <ul className="mt-8 space-y-2 text-[13px] text-bg/85">
                <li>{siteInfo.address}</li>
                <li>{siteInfo.hours}</li>
                <li className="text-bg/60">
                  Суміжний магазин {siteInfo.instagramLand.handle}
                </li>
              </ul>

              <Button
                href={siteInfo.mapsUrl}
                variant="light"
                className="mt-10 self-start"
              >
                {showroom.ctaLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
