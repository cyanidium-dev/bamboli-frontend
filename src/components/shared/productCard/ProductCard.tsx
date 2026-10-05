"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge, Product } from "@/types/product";
import { cn, defaultSize, discountPercent, formatPrice } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import ColorSwatches from "./ColorSwatches";
import { ChevronIcon } from "@/components/shared/ui/Icons";

const badgeLabel: Record<Badge, string> = {
  new: "Новинка",
  top: "Топ",
  sale: "Знижка",
};

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const color = product.colors[colorIndex];
  const imageCount = color.images.length;

  const step = (direction: 1 | -1) =>
    setImageIndex((imageIndex + direction + imageCount) % imageCount);

  // The first in-stock size decides the price shown, so the card always has a
  // concrete price instead of a «від» range.
  const size = color.sizes.find((item) => item.label === defaultSize(color));
  const price = size?.price ?? product.price;
  const oldPrice = size ? size.oldPrice : product.oldPrice;

  return (
    <article className="group/card relative flex h-full flex-col">
      <div className="relative aspect-3/4 w-full overflow-hidden bg-sand">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={product.title}
        >
          {/* One transform node for the zoom, opacity-only crossfade inside —
              animating scale on both layers at once is what made it stutter.
              -inset-px paints the layer a pixel past the clip box: grid columns
              land on fractional widths, and an antialiased edge on that seam is
              exactly the 1px hairline you see while hovering. */}
          <div className="absolute -inset-px transform-gpu transition-transform duration-(--duration-slow) ease-out lg:group-hover/card:scale-[1.025]">
            {/* All photos of the colour stacked; only opacity changes, so
                switching crossfades instead of popping. */}
            {color.images.map((src, index) => (
              <Image
                key={`${color.id}-${index}`}
                src={src}
                alt={index === imageIndex ? product.title : ""}
                aria-hidden={index !== imageIndex}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                priority={priority && index === 0}
                className={cn(
                  "object-cover transition-opacity duration-(--duration-base) ease-out",
                  index === imageIndex ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </Link>

        {product.badges.length > 0 && (
          <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "u-label bg-bg/90 px-2 py-[5px] backdrop-blur-[2px]",
                  badge === "sale" && "bg-clay text-bg",
                )}
              >
                {badge === "sale" && discountPercent(price, oldPrice)
                  ? `−${discountPercent(price, oldPrice)}%`
                  : badgeLabel[badge]}
              </span>
            ))}
          </div>
        )}

        {imageCount > 1 && (
          <>
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => step(direction)}
                aria-label={direction === 1 ? "Наступне фото" : "Попереднє фото"}
                className={cn(
                  "absolute top-1/2 z-20 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-bg/60 text-ink transition hover:bg-bg active:scale-90 lg:opacity-0 lg:group-hover/card:opacity-100 lg:focus-visible:opacity-100",
                  direction === 1 ? "right-1" : "left-1",
                )}
              >
                <ChevronIcon
                  className={cn(
                    "size-5",
                    direction === 1 ? "-rotate-90" : "rotate-90",
                  )}
                />
              </button>
            ))}
          </>
        )}

        {imageCount > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center gap-1.5">
            {color.images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "size-1.5 rounded-full bg-white transition-opacity duration-(--duration-base) drop-shadow-[0_1px_2px_rgba(23,22,20,0.35)]",
                  index === imageIndex ? "opacity-100" : "opacity-50",
                )}
              />
            ))}
          </div>
        )}

        <FavoriteButton
          slug={product.slug}
          className="absolute right-3 top-3 z-20"
        />
      </div>

      <div className="flex flex-1 flex-col pt-3 text-center">
        {/* Fixed-height row even without a colour choice, so titles start at
            the same y on every card in a grid/carousel. */}
        <div className="mb-2.5 flex h-3.5 items-center justify-center">
          {product.colors.length > 1 && (
            <ColorSwatches
              colors={product.colors}
              activeIndex={colorIndex}
              onChange={(index) => {
                setColorIndex(index);
                setImageIndex(0);
              }}
            />
          )}
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="u-h3 mb-1.5 line-clamp-2">{product.title}</h3>
        </Link>

        <div className="mt-auto flex items-baseline justify-center gap-2">
          <motion.span
            key={color.id}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "text-[12px] tabular-nums",
              oldPrice && "text-clay",
            )}
          >
            {formatPrice(price)}
          </motion.span>
          {oldPrice && (
            <span className="u-caption line-through tabular-nums">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
