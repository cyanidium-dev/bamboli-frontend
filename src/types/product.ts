/**
 * Domain model for the shop.
 *
 * The shape is deliberately CMS-shaped: every entity carries a stable `id`
 * so the local fixtures in `src/data` can be swapped for a Sanity/CRM payload
 * without touching a single component. See `src/lib/api.ts`.
 *
 * Category tree — docs/spec/marketing-structure.md §2.1: three main
 * categories (Одяг / Іграшки / Аксесуари), each with its own subcategories.
 * Clothing additionally carries `audience` (дівчата/хлопчики/немовлята — a
 * product can hold several, unisex items hold none) and `collections`
 * (льон/нова колекція/сезонні колекції/вишиванки — tags layered on top of
 * the type, not a separate tree) so one product never has to be duplicated
 * across "Дівчата → сукні", "Колекції → льон" and "Вишиванки → дівчата".
 */

export type MainCategorySlug = "odyag" | "igrashky" | "aksesuary";

export type ClothingSubcategorySlug =
  | "sukni"
  | "spidnytsi"
  | "kombinezony"
  | "sorochky"
  | "shtany"
  | "shorty"
  | "kostyumy"
  | "verkhniy-odyag"
  | "bodi"
  | "cholovichky"
  | "komplekty"
  | "odyag";

export type ToySubcategorySlug =
  | "posud"
  | "gryzuntsi"
  | "rozvyvayuchi-igrashky"
  | "myaki-igrashky";

export type AccessorySubcategorySlug =
  | "shapochky-ta-povyazky"
  | "pledy-ta-konverty"
  | "tekstyl-dlya-snu"
  | "shkarpetky-ta-kolgotky"
  | "ryukzaky-ta-sumky"
  | "slyunyavchyky-ta-nagrudnyky"
  | "dribnytsi";

export type Subcategory =
  | ClothingSubcategorySlug
  | ToySubcategorySlug
  | AccessorySubcategorySlug;

export type ProductKind = "apparel" | "toy";

/** "new" — Sanity-прапорець «Новинка», "top" — «Топ», "sale" — «Знижка». */
export type Badge = "new" | "top" | "sale";

/** «За ким носять» — товар одягу може мати кілька значень (унісекс = жодного). */
export type Audience = "divchatka" | "khlopchyky" | "malyuky";

/** Мітки поверх типу одягу — групи «Колекції» та «Вишиванки» в хедері. */
export type Collection = "llon" | "nova-kolektsiya" | "sezonni-kolektsiyi" | "vyshyvanky";

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
  category: MainCategorySlug;
  /** Type within the category — сукні, боді, посуд… §2.1. */
  subcategory: Subcategory;
  kind: ProductKind;
  /** Lowest price across size groups — what the card shows as «від». */
  price: number;
  oldPrice?: number;
  badges: Badge[];
  /** Clothing only. Empty/undefined = unisex (shows only under «Для всіх»). */
  audience?: Audience[];
  /** Clothing only — tags, not a separate tree. */
  collections?: Collection[];
  /** Reference to the brand directory; also drives /catalog/igrashky/brend/[slug]. */
  brand?: string;
  description: string;
  details: { label: string; value: string }[];
  colors: ColorVariant[];
}

export interface Category {
  slug: MainCategorySlug;
  title: string;
  caption: string;
  image: string;
}
