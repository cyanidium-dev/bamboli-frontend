"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { Product } from "@/types/product";
import { declOfNum } from "@/lib/utils";
import Dropdown from "@/components/shared/ui/Dropdown";
import { useFavoritesStore } from "@/store/favoritesStore";
import Button from "@/components/shared/ui/Button";
import { uiText } from "@/data/uiText";
import EmptyState from "@/components/shared/ui/EmptyState";

type SortKey = "recent" | "price-asc" | "price-desc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Спочатку нові" },
  { key: "price-asc", label: "Ціна: зростання" },
  { key: "price-desc", label: "Ціна: спадання" },
];

export default function FavoritesView({ products }: { products: Product[] }) {
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<SortKey>("recent");
  const slugs = useFavoritesStore((state) => state.slugs);

  useEffect(() => setMounted(true), []);

  const favorites = useMemo(() => {
    if (!mounted) return [];
    // slugs, newest-first (most recently favorited first)
    return slugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => Boolean(product))
      .reverse();
  }, [mounted, slugs, products]);

  const visible = useMemo(() => {
    const sorted = favorites.slice();
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [favorites, sort]);

  if (!mounted) return null;

  if (favorites.length === 0) {
    return (
      <EmptyState
        className="py-20"
        title="У вас поки немає обраного"
        text="Натискайте сердечко на товарах, які вам сподобались — вони з'являться тут."
        action={
          <Button variant="text-link" href="/catalog">
            {uiText.nav.toCatalog}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-end gap-4 border-y border-line py-3.5 lg:mb-12">
        <Dropdown
          className="shrink-0"
          value={sort}
          options={sortOptions.map((option) => ({
            value: option.key,
            label: option.label,
          }))}
          onChange={(value) => setSort(value as SortKey)}
        />
      </div>

      <ProductGrid products={visible} priorityCount={4} />

      <p className="u-caption mt-10">
        {visible.length}{" "}
        {declOfNum(visible.length, ["товар", "товари", "товарів"])}
      </p>
    </>
  );
}
