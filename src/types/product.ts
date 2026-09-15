/**
 * Domain model for the shop.
 *
 * The shape is deliberately CMS-shaped: every entity carries a stable `id`
 * so the local fixtures in `src/data` can be swapped for a Sanity/CRM payload
 * without touching a single component. See `src/lib/api.ts`.
 */

export type CategorySlug =
  | "dlya-malyukiv"
  | "kostyumy"
  | "verkhniy-odyag"
  | "vyshyvanky"
  | "sukni"
  | "igrashky"
  | "aksesuary";

export type ProductKind = "apparel" | "toy";

/** "top" — Sanity-прапорець «Топ», "sale" — «Знижка». */
export type Badge = "new" | "top" | "sale";

/** Used by the «Дівчатка / Хлопчики» tabs on vyshyvanky. */
export type Audience = "girls" | "boys";

export interface SizeOption {
  /** Human label shown on the size chip — a height range, e.g. "80–104". */
  label: string;
  inStock: boolean;
  /** Bamboli prices by size group; falls back to `Product.price`. */
  price?: number;
  oldPrice?: number;
}

export interface ColorVariant {
  id: string;
  name: string;
  /** Swatch fill. Two stops render a split swatch for melange fabrics. */
  hex: string;
  /** [0] is the card image, [1] is revealed on hover, the rest feed the gallery. */
  images: string[];
  sizes: SizeOption[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  /** Short qualifier under the title: "льон · 80–134 см". */
  subtitle: string;
  category: CategorySlug;
  kind: ProductKind;
  /** Lowest price across size groups — what the card shows as «від». */
  price: number;
  oldPrice?: number;
  badges: Badge[];
  audience?: Audience;
  brand?: string;
  description: string;
  details: { label: string; value: string }[];
  colors: ColorVariant[];
}

export interface Category {
  slug: CategorySlug;
  title: string;
  caption: string;
  image: string;
}
