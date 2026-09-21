import { categories } from "@/data/categories";
import { findOdyagGroup } from "@/data/categoryTree";
import { products } from "@/data/products";
import { blogCategories, blogPosts } from "@/data/blog";
import { slugify } from "@/lib/utils";
import { Audience, Category, Collection, MainCategorySlug, Product } from "@/types/product";
import { BlogCategorySlug, BlogPost } from "@/types/blog";

/**
 * The single seam between the UI and the data source.
 *
 * Everything is async on purpose: today it resolves local fixtures, tomorrow
 * the bodies become Sanity/KeyCRM fetches and no component has to change.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByCategory(
  slug: MainCategorySlug,
  limit?: number,
): Promise<Product[]> {
  return products
    .filter((product) => product.category === slug)
    .slice(0, limit);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

/** Resolves favorited slugs (localStorage) to full products, favorites order preserved. */
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const rest = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Sanity flag «Топ»; `audience` narrows to the home page gender tabs. */
export async function getTopProducts(limit = 8, audience?: Audience): Promise<Product[]> {
  return products
    .filter((product) => product.badges.includes("top"))
    .filter((product) => !audience || product.audience?.includes(audience))
    .slice(0, limit);
}

/** Sanity flag «Новинка»; `audience` narrows to the home page gender tabs. */
export async function getNewProducts(limit?: number, audience?: Audience): Promise<Product[]> {
  return products
    .filter((product) => product.badges.includes("new"))
    .filter((product) => !audience || product.audience?.includes(audience))
    .slice(0, limit);
}

/** Sanity flag «Знижка»; `audience` narrows to the home page gender tabs. */
export async function getSaleProducts(limit?: number, audience?: Audience): Promise<Product[]> {
  return products
    .filter((product) => product.badges.includes("sale"))
    .filter((product) => !audience || product.audience?.includes(audience))
    .slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug);
}

/**
 * Одяг catalog — docs/spec/marketing-structure.md §2.1 "Як це влаштовано в
 * даних": a group filters either by `audience`, by `collections`, or (for
 * «Для всіх») not at all; the vyshyvanky group is collections+audience
 * combined. `subSlug` is the second URL segment and means a product type for
 * most groups, a collection tag for «kolektsiyi», and an audience for
 * «vyshyvanky».
 */
export async function getOdyagProducts(
  groupSlug?: string,
  subSlug?: string,
  limit?: number,
): Promise<Product[]> {
  let list = products.filter((product) => product.category === "odyag");
  const group = groupSlug ? findOdyagGroup(groupSlug) : undefined;
  if (groupSlug && !group) return [];

  if (group) {
    if (group.filterKind === "audience" && group.audience) {
      list = list.filter((product) => product.audience?.includes(group.audience!));
      if (subSlug) list = list.filter((product) => product.subcategory === subSlug);
    } else if (group.filterKind === "collection") {
      if (subSlug) {
        list = list.filter((product) => product.collections?.includes(subSlug as Collection));
      }
    } else if (group.filterKind === "vyshyvanky") {
      list = list.filter((product) => product.collections?.includes("vyshyvanky"));
      if (subSlug) {
        list = list.filter((product) => product.audience?.includes(subSlug as Audience));
      }
    } else if (group.filterKind === "all" && subSlug) {
      list = list.filter((product) => product.subcategory === subSlug);
    }
  }

  return list.slice(0, limit);
}

export async function getIgrashkyProducts(
  subSlug?: string,
  brandSlug?: string,
  limit?: number,
): Promise<Product[]> {
  let list = products.filter((product) => product.category === "igrashky");
  if (brandSlug) {
    list = list.filter((product) => product.brand && slugify(product.brand) === brandSlug);
  } else if (subSlug) {
    list = list.filter((product) => product.subcategory === subSlug);
  }
  return list.slice(0, limit);
}

export async function getAksesuaryProducts(
  subSlug?: string,
  limit?: number,
): Promise<Product[]> {
  let list = products.filter((product) => product.category === "aksesuary");
  if (subSlug) list = list.filter((product) => product.subcategory === subSlug);
  return list.slice(0, limit);
}

/** «Вишиванки» spotlight on the home page — vyshyvanka tag + optional audience tab. */
export async function getVyshyvankaProducts(
  audience?: Audience,
  limit?: number,
): Promise<Product[]> {
  return products
    .filter(
      (product) =>
        product.collections?.includes("vyshyvanky") &&
        (!audience || product.audience?.includes(audience)),
    )
    .slice(0, limit);
}

/** Newest first — matches the ordering a Sanity `_createdAt desc` query would return. */
export async function getBlogPosts(category?: BlogCategorySlug): Promise<BlogPost[]> {
  return [...blogPosts]
    .filter((post) => !category || post.category === category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((post) => post.slug === slug);
}

export async function getBlogCategories() {
  return blogCategories;
}

/** Same category first, newest first, current post excluded. */
export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const sameCategory = blogPosts.filter(
    (item) => item.category === post.category && item.id !== post.id,
  );
  const rest = blogPosts.filter(
    (item) => item.category !== post.category && item.id !== post.id,
  );
  return [...sameCategory, ...rest]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
