"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge, Product } from "@/types/product";
import { cn, defaultSize, discountPercent, formatPrice } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import ColorSwatches from "./ColorSwatches";

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

  const color = product.colors[colorIndex];
  const [front, back = front] = color.images;

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
          <div className="absolute -inset-px transform-gpu transition-transform duration-[800ms] ease-out lg:group-hover/card:scale-[1.025]">
            <Image
              key={`${color.id}-front`}
              src={front}
              alt={product.title}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-opacity duration-[550ms] ease-out lg:group-hover/card:opacity-0"
            />
            <Image
              key={`${color.id}-back`}
              src={back}
              alt=""
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
              aria-hidden
              className="object-cover opacity-0 transition-opacity duration-[550ms] ease-out lg:group-hover/card:opacity-100"
            />
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
              onChange={setColorIndex}
            />
          )}
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="u-label mb-1.5 line-clamp-2 font-bold">{product.title}</h3>
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
            <span className="text-[11px] text-muted line-through tabular-nums">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
