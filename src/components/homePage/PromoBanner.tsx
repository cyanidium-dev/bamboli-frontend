import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import InViewVideo from "@/components/shared/ui/InViewVideo";
import { promo } from "@/data/home";

export default function PromoBanner() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden bg-ink text-bg md:grid-cols-2">
            <div className="relative aspect-4/5 w-full md:aspect-auto md:min-h-[560px]">
              {promo.video ? (
                <InViewVideo
                  src={promo.video}
                  poster={promo.image.src}
                  className="absolute inset-0"
                />
              ) : (
                <Image
                  src={promo.image.src}
                  alt={promo.image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[50%_72%]"
                />
              )}
            </div>

            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
              <p className="u-label mb-5 text-bg/60">{promo.label}</p>
              <h2 className="u-display max-w-[460px] text-[34px] leading-[1.08] lg:text-[48px]">
                {promo.title}
              </h2>
              <p className="mt-6 max-w-[400px] text-[13px] leading-relaxed text-bg/70">
                {promo.text}
              </p>
              <Link
                href={promo.cta.href}
                className="u-label mt-10 self-start border border-bg px-7 py-4 transition duration-300 hover:bg-bg hover:text-ink"
              >
                {promo.cta.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
