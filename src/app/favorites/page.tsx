import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import FavoritesView from "@/components/favoritesPage/FavoritesView";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Обране",
  description: "Товари, які ви додали в обране на Bamboli.",
};

export default async function FavoritesPage() {
  const products = await getProducts();

  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CatalogHeader
        title="Обране"
        caption="Тут збираються товари, які сподобались найбільше — просто натисніть на сердечко біля товару, і він з'явиться в цьому списку."
        breadcrumbs={[{ label: "Обране" }]}
      />
      <FavoritesView products={products} />
    </Container>
  );
}
