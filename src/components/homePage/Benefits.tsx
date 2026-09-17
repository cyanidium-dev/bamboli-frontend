import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { benefits, BenefitIcon } from "@/data/home";

const iconPaths: Record<BenefitIcon, React.ReactNode> = {
  needle: (
    <>
      <path d="M8 24 24 8" />
      <ellipse cx="23" cy="9" rx="1.2" ry="2.4" transform="rotate(45 23 9)" />
      <path d="M6 20c3-1 5 1 4 4M11 17c-4 0-7 3-5 8" />
    </>
  ),
  leaf: (
    <>
      <path d="M7 25C7 13 14 7 25 7c0 11-6 18-18 18Z" />
      <path d="M7 25 18 14" />
    </>
  ),
  ruler: (
    <>
      <rect x="5" y="11" width="22" height="10" rx="1" />
      <path d="M9 11v4M13 11v3M17 11v4M21 11v3M25 11v4" />
    </>
  ),
  store: (
    <>
      <path d="M5 12h22l-2-5H7l-2 5Z" />
      <path d="M7 12v13h18V12M13 25v-7h6v7" />
    </>
  ),
  card: (
    <>
      <rect x="4" y="8" width="24" height="16" rx="2" />
      <path d="M4 13h24M8 19h5" />
    </>
  ),
  gift: (
    <>
      <rect x="6" y="13" width="20" height="12" />
      <path d="M4 9h24v4H4zM16 9v16" />
      <path d="M16 9c-2-4-7-4-6-1 .5 1.5 6 1 6 1Zm0 0c2-4 7-4 6-1-.5 1.5-6 1-6 1Z" />
    </>
  ),
};

export default function Benefits() {
  return (
    <section className="mt-20 bg-sand py-16 lg:mt-28 lg:py-24">
      <Container className="relative isolate">
        {/* Decorative accents from the Figma design — hidden on small screens where the grid stacks over them. */}
        <Image
          src="/images/bamboli/decor/heart-white.svg"
          alt=""
          width={356}
          height={301}
          aria-hidden
          className="pointer-events-none absolute left-[64.2%] top-[3.5%] -z-10 hidden w-[28%] h-auto lg:block"
        />
        <Image
          src="/images/bamboli/decor/heart-olive.svg"
          alt=""
          width={128}
          height={119}
          aria-hidden
          className="pointer-events-none absolute left-[51%] top-[9%] rotate-[-30deg] -z-10 hidden w-[10%] h-auto rotate-15 lg:block"
        />
        <Image
          src="/images/bamboli/decor/stitch-line-long.svg"
          alt=""
          width={247}
          height={18}
          aria-hidden
          className="pointer-events-none absolute left-[68.5%] top-[20.4%] -z-10 hidden w-[19.5%] h-auto lg:block"
        />

        <div className="relative mb-10 max-w-[560px] lg:mb-14">
          <p className="u-label mb-3 text-muted">Чому Bamboli</p>
          <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
            Кожен стібок, кожна деталь — з любов&apos;ю
          </h2>
        </div>

        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <li key={benefit.title} className="bg-sand">
              <Reveal delay={index * 0.05} className="h-full p-7 lg:p-9">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-6 size-9 text-clay"
                  aria-hidden
                >
                  {iconPaths[benefit.icon]}
                </svg>
                <h3 className="u-label mb-3">{benefit.title}</h3>
                <p className="max-w-[340px] text-[13px] leading-relaxed text-muted">
                  {benefit.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
