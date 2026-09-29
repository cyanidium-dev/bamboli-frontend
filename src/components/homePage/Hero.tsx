"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/data/home";
import type { HeroSlide } from "@/types/hero";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 4000;

/**
 * Full-bleed autoplay slider: text sits over the photo (left or right on
 * desktop, per slide). Pagination is a row of thin lines with a progress fill.
 */
export default function Hero({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  // Touch swipe: a mostly-horizontal drag past the threshold flips the slide.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || count < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  useEffect(() => {
    if (count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, count, next]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Головний слайдер"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="group/hero relative touch-pan-y h-[min(600px,calc(100svh-74px))] min-h-[460px] sm:h-[min(600px,calc(100svh-74px))] w-full overflow-hidden bg-sand lg:h-[min(720px,calc(100svh-74px))]"
    >
      {slides.map((slide, i) => {
        const isActive = i === active;
        const Heading = i === 0 ? "h1" : "h2";
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} з ${count}`}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              isActive ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn("object-cover object-[50%_35%]", isActive && "hero-zoom")}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent lg:bg-none" />
            <div
              className={cn(
                "absolute inset-0 hidden from-black/40 to-transparent lg:block",
                slide.textPosition === "left" ? "bg-linear-to-r" : "bg-linear-to-l",
              )}
            />

            {/* Whole slide is a link; the CTA below stays as the visible button. */}
            <Link
              href={slide.cta.href}
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 z-[1]"
            />

            <div
              className={cn(
                "pointer-events-none relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-end px-5 pb-20 text-white lg:items-start lg:px-10 lg:pb-24",
                slide.textPosition === "right" && "lg:items-end lg:text-right",
              )}
            >
              <div
                className={cn(
                  "flex max-w-[520px] flex-col items-center text-center lg:max-w-[560px] lg:items-start lg:text-left",
                  slide.textPosition === "right" && "lg:items-end lg:text-right",
                )}
              >
                <p
                  className={cn(
                    "u-label mb-4 text-white/90",
                  )}
                >
                  {slide.eyebrow}
                </p>
                <Heading
                  className={cn(
                    "u-display text-[36px] leading-[1.05] sm:text-[48px] xl:text-[48px]",
                  )}
                >
                  {slide.title}
                </Heading>
                <Link
                  href={slide.cta.href}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    "u-label pointer-events-auto relative z-[2] mt-7 border border-white bg-white px-7 py-4 text-ink transition duration-300 hover:bg-transparent hover:text-white",
                  )}
                >
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Попередній слайд"
            onClick={prev}
            className="absolute left-6 top-1/2 z-10 hidden size-14 -translate-y-1/2 items-center justify-center text-white transition duration-300 hover:opacity-70 lg:flex"
          >
            <ChevronIcon className="size-10 rotate-90" />
          </button>
          <button
            type="button"
            aria-label="Наступний слайд"
            onClick={next}
            className="absolute right-6 top-1/2 z-10 hidden size-14 -translate-y-1/2 items-center justify-center text-white transition duration-300 hover:opacity-70 lg:flex"
          >
            <ChevronIcon className="size-10 -rotate-90" />
          </button>
        </>
      )}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2 px-5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="group flex h-6 w-10 items-center sm:w-14"
            >
              <span className="relative block h-[3px] w-full bg-white/50 group-hover:bg-white/80">
                {i === active && (
                  <span
                    key={active}
                    className="hero-progress absolute inset-y-0 left-0 block bg-white"
                    style={{ animationDuration: `${INTERVAL_MS}ms` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
