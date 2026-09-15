import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/home";
import { CheckIcon } from "@/components/shared/ui/Icons";

/**
 * Split hero: the copy sits on a sand panel, the photography keeps its own
 * portrait crop instead of being stretched into a letterbox.
 */
export default function Hero() {
  return (
    <section className="grid lg:min-h-[calc(100svh-74px)] lg:grid-cols-[1fr_1.05fr]">
      <div className="order-2 flex flex-col justify-center bg-sand px-5 py-12 lg:order-1 lg:px-14 lg:py-20 xl:px-20">
        <p className="u-label mb-6 text-muted">{hero.label}</p>
        <h1 className="u-display max-w-[600px] text-[40px] leading-[1.04] sm:text-[52px] lg:text-[58px] xl:text-[66px]">
          {hero.title}
        </h1>
        <p className="mt-7 max-w-[440px] text-[13px] leading-relaxed text-muted">
          {hero.text}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={hero.primaryCta.href}
            className="u-label border border-ink bg-ink px-7 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="u-label border border-ink/25 px-7 py-4 transition duration-300 hover:border-ink"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>

        <ul className="mt-12 grid max-w-[480px] grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-6">
          {hero.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-[12px]">
              <CheckIcon className="size-4 shrink-0 text-clay" />
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative order-1 aspect-4/5 w-full overflow-hidden bg-sand sm:aspect-16/11 lg:order-2 lg:aspect-auto lg:h-full">
        <div className="absolute -inset-px">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
      </div>
    </section>
  );
}
