"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Horizontal row that scrolls when its items don't fit. Touch swipes natively;
 * on desktop the hidden scrollbar is replaced by mouse-wheel and drag scrolling.
 */
export default function ScrollTabs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const scrollBy = (direction: 1 | -1) =>
    ref.current?.scrollBy({
      left: direction * ref.current.clientWidth * 0.6,
      behavior: "smooth",
    });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || el.scrollWidth <= el.clientWidth) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      dragging = false;
    };
    // A drag must not count as a click on the tab under the cursor.
    const onClick = (event: MouseEvent) => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [update]);

  const arrow =
    "absolute top-0 bottom-0 z-10 flex w-9 items-center from-bg via-bg/90 to-transparent text-ink transition-opacity duration-300 hover:opacity-60";

  return (
    <div className="relative max-w-full">
      <div ref={ref} className={cn("no-scrollbar overflow-x-auto", className)}>
        {children}
      </div>
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Гортати назад"
        tabIndex={canPrev ? 0 : -1}
        className={cn(arrow, "left-0 justify-start bg-gradient-to-r", !canPrev && "pointer-events-none opacity-0")}
      >
        <ChevronIcon className="size-4 rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Гортати далі"
        tabIndex={canNext ? 0 : -1}
        className={cn(arrow, "right-0 justify-end bg-gradient-to-l", !canNext && "pointer-events-none opacity-0")}
      >
        <ChevronIcon className="size-4 -rotate-90" />
      </button>
    </div>
  );
}
