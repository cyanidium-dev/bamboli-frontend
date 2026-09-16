import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return `${priceFormatter.format(value)} ₴`;
}

/** Price of the chosen size group; product-level price when nothing is chosen. */
export function priceForSize(product: Product, size: string | null) {
  const option = product.colors
    .flatMap((color) => color.sizes)
    .find((item) => item.label === size);
  return {
    price: option?.price ?? product.price,
    oldPrice: option?.oldPrice ?? product.oldPrice,
  };
}

/** True when size groups are priced differently — the card then says «від». */
export function hasPriceRange(product: Product) {
  const prices = new Set(
    product.colors.flatMap((color) =>
      color.sizes.map((size) => size.price ?? product.price),
    ),
  );
  return prices.size > 1;
}

export function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function variantKey(
  productId: string,
  colorId: string,
  size: string | null,
) {
  return `${productId}:${colorId}:${size ?? "-"}`;
}

/** "Done by Deer" → "done-by-deer" — used to route the brand directory. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function declOfNum(n: number, forms: [string, string, string]) {
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}
