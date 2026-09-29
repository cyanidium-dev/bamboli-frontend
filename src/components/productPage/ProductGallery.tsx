"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import ProductLightbox from "@/components/productPage/ProductLightbox";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = images.length;
  const hasMany = total > 1;

  const go = (delta: number) => {
    if (!hasMany) return;
    setIndex((i) => (i + delta + total) % total);
  };

  // Touch swipe, same rule as the home hero: a mostly-horizontal drag flips the photo.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !hasMany) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  if (total === 0) return null;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-3/4 w-full touch-pan-y overflow-hidden bg-sand lg:max-w-[560px]"
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Переглянути фото на весь екран"
          className="absolute inset-0 z-10 cursor-zoom-in"
        />
        <div className="absolute -inset-px">
          <Image
            key={images[index]}
            src={images[index]}
            alt={alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1023px) 86vw, 55vw"
            className="object-cover"
          />
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              aria-label="Попереднє фото"
              className="absolute left-1 top-1/2 z-20 -translate-y-1/2 flex size-14 items-center justify-center text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)] transition duration-300 hover:opacity-70"
            >
              <ChevronIcon className="size-10 rotate-90" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              aria-label="Наступне фото"
              className="absolute right-1 top-1/2 z-20 -translate-y-1/2 flex size-14 items-center justify-center text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)] transition duration-300 hover:opacity-70"
            >
              <ChevronIcon className="size-10 -rotate-90" />
            </button>
            <div className="u-label absolute right-3 top-3 z-20 rounded-full bg-ink/70 px-2.5 py-1 text-bg">
              {index + 1} / {total}
            </div>
          </>
        )}
      </motion.div>

      {hasMany && (
        <ul className="mt-3 flex flex-wrap gap-2 lg:max-w-[560px]">
          {images.map((src, i) => (
            <li key={`${src}-${i}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Фото ${i + 1} з ${total}`}
                aria-current={i === index}
                className={cn(
                  "relative size-16 overflow-hidden transition duration-300 ease-out sm:size-14",
                  i === index
                    ? "ring-2 ring-ink"
                    : "opacity-60 ring-1 ring-line hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <ProductLightbox
        images={images}
        alt={alt}
        index={index}
        onIndexChange={setIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
