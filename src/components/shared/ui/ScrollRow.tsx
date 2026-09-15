"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/shared/ui/Icons";

/**
 * Native horizontal scroller with snap: swipe on touch, arrows on desktop.
 * Bleeds to the screen edge on phones so the next card peeks in.
 */
export default function ScrollRow({
  children,
  itemClassName,
  label,
  arrowTop = "50%",
}: {
  children: React.ReactNode;
  itemClassName?: string;
  label: string;
  arrowTop?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    track?.scrollBy({
      left: direction * track.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  const arrowClass =
    "absolute z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/95 text-ink shadow-[0_2px_14px_rgba(23,22,20,0.08)] transition duration-300 hover:border-ink lg:flex";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={update}
        role="region"
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:gap-5 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {Children.map(children, (child) => (
          <div className={cn("shrink-0 snap-start", itemClassName)}>{child}</div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Попередні"
        style={{ top: arrowTop }}
        className={cn(
          arrowClass,
          "-left-5",
          !canPrev && "pointer-events-none opacity-0",
        )}
      >
        <ArrowIcon className="size-4 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Наступні"
        style={{ top: arrowTop }}
        className={cn(
          arrowClass,
          "-right-5",
          !canNext && "pointer-events-none opacity-0",
        )}
      >
        <ArrowIcon className="size-4" />
      </button>
    </div>
  );
}
