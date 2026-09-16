"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { Product } from "@/types/product";
import { cn, declOfNum } from "@/lib/utils";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import { useFavoritesStore } from "@/store/favoritesStore";

type SortKey = "recent" | "price-asc" | "price-desc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Спочатку нові" },
  { key: "price-asc", label: "Ціна: зростання" },
  { key: "price-desc", label: "Ціна: спадання" },
];

export default function FavoritesView({ products }: { products: Product[] }) {
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<SortKey>("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const slugs = useFavoritesStore((state) => state.slugs);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sortOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortOpen]);

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
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <p className="u-display text-[24px]">У вас поки немає обраного</p>
        <p className="max-w-[280px] text-[13px] text-muted">
          Натискайте сердечко на товарах, які вам сподобались — вони з&apos;являться тут.
        </p>
        <Link href="/catalog" className="u-label border-b border-ink pb-1">
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-end gap-4 border-y border-line py-3.5 lg:mb-12">
        <div ref={sortRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="u-label flex items-center gap-1.5 py-1"
          >
            {sortOptions.find((option) => option.key === sort)?.label}
            <ChevronIcon
              className={cn(
                "size-4 transition-transform duration-300",
                sortOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full z-40 mt-2 w-[210px] max-w-[calc(100vw-2rem)] border border-line bg-bg py-1 shadow-[0_8px_30px_rgba(23,22,20,0.06)]"
              >
                {sortOptions.map((option) => (
                  <li key={option.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSort(option.key);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "block w-full px-4 py-2.5 text-left text-[12px] transition hover:bg-sand",
                        option.key === sort && "text-ink",
                        option.key !== sort && "text-muted",
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProductGrid products={visible} priorityCount={4} />

      <p className="mt-10 text-[11px] text-muted">
        {visible.length}{" "}
        {declOfNum(visible.length, ["товар", "товари", "товарів"])}
      </p>
    </>
  );
}
