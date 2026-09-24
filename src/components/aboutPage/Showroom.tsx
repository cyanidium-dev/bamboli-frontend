import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { showroom } from "@/data/about";
import { siteInfo } from "@/data/siteInfo";

export default function Showroom() {
  return (
    <section className="pt-20 lg:pt-28">
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
              <h2 className="u-display max-w-[420px] text-[20px] leading-[1.12] sm:text-[30px] lg:text-[42px]">
                {showroom.title}
              </h2>
              <p className="mt-6 max-w-[400px] text-[13px] leading-relaxed text-bg/70">
                {showroom.text}
              </p>

              <ul className="mt-8 space-y-2 text-[13px] text-bg/85">
                <li>{siteInfo.address}</li>
                <li>{siteInfo.hours}</li>
                <li className="text-bg/60">
                  Суміжний магазин {siteInfo.instagramLand.handle}
                </li>
              </ul>

              <a
                href={siteInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="u-label mt-10 self-start border border-bg px-7 py-4 transition duration-300 hover:bg-bg hover:text-ink"
              >
                {showroom.ctaLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
