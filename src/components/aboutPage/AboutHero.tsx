import Image from "next/image";
import Link from "next/link";
import Page from "@/components/shared/ui/Page";
import Reveal from "@/components/shared/ui/Reveal";
import { aboutHero } from "@/data/about";
import { uiText } from "@/data/uiText";

export default function AboutHero() {
  return (
    <Page>
      <nav aria-label="Навігація" className="u-label mb-10 text-muted lg:mb-16">
        <Link href="/" className="transition hover:text-ink">
          {uiText.nav.home}
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink">Про нас</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="relative lg:col-span-5">
          <span
            aria-hidden
            // eslint-disable-next-line no-restricted-syntax -- decorative numeral, not text
            className="u-display pointer-events-none absolute -top-10 left-0 hidden select-none text-[140px] leading-none text-line lg:block"
          >
            01
          </span>

          <div className="relative flex h-full flex-col justify-center">
            <p className="u-label mb-4 text-clay">Bamboli</p>
            <h1 className="u-h2">
              {aboutHero.title}
            </h1>

            <div className="mt-8 max-w-[380px]">
              <p className="u-body">
                {aboutHero.text}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-clay" />
                <span className="u-label text-muted">
                  Львів · Власне виробництво
                </span>
              </div>
            </div>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="relative">
            <div className="absolute inset-0 hidden translate-x-5 translate-y-5 border border-clay/40 lg:block" />
            <div className="relative aspect-4/5 w-full overflow-hidden bg-sand lg:aspect-auto lg:h-[620px]">
              <Image
                src={aboutHero.image.src}
                alt={aboutHero.image.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Page>
  );
}
