import type { Metadata } from "next";
import Page from "@/components/shared/ui/Page";
import CatalogView from "@/components/catalogPage/CatalogView";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог Bamboli: дитячий одяг власного виробництва, вишиванки, іграшки, посуд і товари для сну.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const [products, { sort }] = await Promise.all([getProducts(), searchParams]);

  return (
    <Page>
      <CatalogView
        heading={{
          title: "Каталог",
          caption:
            "Одяг з натуральних тканин від 56 до 164 см, вишиванки, іграшки й посуд — в одному кошику.",
          breadcrumbs: [{ label: "Каталог" }],
        }}
        products={products}
        filterBy="category"
        initialSort={sort === "new" ? "new" : "featured"}
      />
    </Page>
  );
}
