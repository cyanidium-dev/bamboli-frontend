import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/ui/Container";
import CatalogView from "@/components/catalogPage/CatalogView";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getSaleProducts,
} from "@/lib/api";
import { CategorySlug } from "@/types/product";

/** /catalog/sale is a filter on the «Знижка» flag, not a real category. */
const SALE = {
  slug: "sale",
  title: "Знижки",
  caption: "Улюблені моделі за вигідною ціною — поки є розміри.",
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return [...categories.map((category) => ({ category: category.slug })), { category: SALE.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = slug === SALE.slug ? SALE : await getCategoryBySlug(slug);
  if (!category) return {};
  return { title: category.title, description: category.caption };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const isSale = slug === SALE.slug;
  const category = isSale ? SALE : await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = isSale
    ? await getSaleProducts()
    : await getProductsByCategory(slug as CategorySlug);

  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CatalogHeader
        title={category.title}
        caption={category.caption}
        breadcrumbs={[
          { label: "Каталог", href: "/catalog" },
          { label: category.title },
        ]}
      />
      <CatalogView products={products} filterBy={isSale ? "category" : "size"} />
    </Container>
  );
}
