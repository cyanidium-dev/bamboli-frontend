import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { Audience, Category, CategorySlug, Product } from "@/types/product";

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
  slug: CategorySlug,
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

/** Sanity flag «Топ». */
export async function getTopProducts(limit = 8): Promise<Product[]> {
  return products.filter((product) => product.badges.includes("top")).slice(0, limit);
}

/** Sanity flag «Знижка». */
export async function getSaleProducts(limit?: number): Promise<Product[]> {
  return products
    .filter((product) => product.badges.includes("sale"))
    .slice(0, limit);
}

export async function getProductsByAudience(
  category: CategorySlug,
  audience: Audience,
  limit?: number,
): Promise<Product[]> {
  return products
    .filter(
      (product) =>
        product.category === category && product.audience === audience,
    )
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
