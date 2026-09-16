/**
 * Domain model for the blog.
 *
 * Sanity-shaped on purpose (docs/spec/admin-sanity.md — "Управління
 * блогом": текстові блоки, таблиці, FAQ-блоки, фото/медіа), so today's
 * mock fixtures in `src/data/blog.ts` can later be swapped for a real
 * `post` document with a Portable Text body without touching a component.
 * See `src/lib/api.ts`.
 *
 * Categories — docs/spec/marketing-structure.md §3.11.
 */

export type BlogCategorySlug =
  | "rozmir-i-doglyad"
  | "vyshyvanky-i-tradytsiyi"
  | "malyuky"
  | "igrashky-i-rozvytok";

export interface BlogCategory {
  slug: BlogCategorySlug;
  title: string;
}

/**
 * Paragraph text supports inline links using `[текст](href)` markdown-style
 * syntax — parsed and rendered by `ArticleContent`. Internal hrefs (starting
 * with `/`) render as `next/link`; anything else opens in a new tab.
 */
export interface BlogParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BlogHeadingBlock {
  type: "heading";
  text: string;
}

export interface BlogQuoteBlock {
  type: "quote";
  text: string;
}

export interface BlogListBlock {
  type: "list";
  items: string[];
}

export interface BlogImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

/** Renders a compact ProductCard inline in the article body. */
export interface BlogProductEmbedBlock {
  type: "productEmbed";
  productSlug: string;
}

/** A short list of related pages/articles/products — "Дивіться також" style. */
export interface BlogLinksBlock {
  type: "links";
  title?: string;
  items: { label: string; href: string }[];
}

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogQuoteBlock
  | BlogListBlock
  | BlogImageBlock
  | BlogTableBlock
  | BlogProductEmbedBlock
  | BlogLinksBlock;

export interface BlogFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  author: string;
  content: BlogContentBlock[];
  faq?: BlogFaqItem[];
}
