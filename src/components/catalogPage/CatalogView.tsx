"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ScrollTabs from "@/components/shared/ui/ScrollTabs";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { cn, declOfNum } from "@/lib/utils";
import { ChevronIcon } from "@/components/shared/ui/Icons";

/** A group of link chips (types, brands) offered inside the «Фільтр» panel. */
export interface FilterGroup {
  label: string;
  chips: { label: string; href: string; active: boolean }[];
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "new";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Рекомендовані" },
  { key: "new", label: "Спочатку новинки" },
  { key: "price-asc", label: "Ціна: зростання" },
  { key: "price-desc", label: "Ціна: спадання" },
];

/** Section tab order; the in-place filter shows all of them even when empty. */
const sectionOrder = ["odyag", "igrashky", "aksesuary"];

const categoryLabels: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.slug, category.title]),
);

/**
 * `filterBy` keeps the toolbar honest: a mixed catalogue filters by section,
 * a single section filters by size (where 56–116, 16–19 and 44–54 no longer
 * sit in the same row and mean three different things).
 */
export default function CatalogView({
  products,
  filterBy = "size",
  initialSort = "featured",
  tabsAbove = false,
  localCategoryFilter = false,
  filterGroups = [],
}: {
  products: Product[];
  filterBy?: "size" | "category";
  initialSort?: SortKey;
  /** A tab row sits right above the toolbar and already draws its top line. */
  tabsAbove?: boolean;
  /** Section tabs filter this list in place instead of leaving for /catalog/<section>. */
  localCategoryFilter?: boolean;
  /** Extra groups (subcategories, brands) shown behind the «Фільтр» button next to sizes. */
  filterGroups?: FilterGroup[];
}) {
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [sortOpen, setSortOpen] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

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

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => set.add(product.category));
    return Array.from(set).sort(
      (a, b) => sectionOrder.indexOf(a) - sectionOrder.indexOf(b),
    );
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) =>
      product.colors.forEach((color) =>
        color.sizes.forEach((item) => set.add(item.label)),
      ),
    );
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, "uk", { numeric: true }),
    );
  }, [products]);

  const visible = useMemo(() => {
    let filtered = products;

    if (filterBy === "size" && size) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) =>
          color.sizes.some((item) => item.label === size && item.inStock),
        ),
      );
    }

    if (filterBy === "category" && category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    const sorted = filtered.slice();
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new")
      sorted.sort(
        (a, b) =>
          Number(b.badges.includes("new")) - Number(a.badges.includes("new")),
      );
    return sorted;
  }, [products, size, sort, category, filterBy]);

  const chips = [
    { value: "", label: filterBy === "size" ? "Всі" : "Усі" },
    ...(filterBy === "category"
      ? (localCategoryFilter ? sectionOrder : allCategories).map((item) => ({
          value: item,
          label: categoryLabels[item] ?? item,
        })).concat(localCategoryFilter ? [] : [{ value: "sale", label: "SALE" }])
      : allSizes.map((item) => ({ value: item, label: item }))),
  ];

  const showSizes = filterBy === "size" && allSizes.length > 1;
  const hasFilter = showSizes || filterGroups.length > 0;
  // «Всі» is the unfiltered state, so it doesn't count as an active filter.
  const activeFilters =
    filterGroups.reduce(
      (sum, group) =>
        sum + group.chips.filter((chip) => chip.active && chip.label !== "Всі").length,
      0,
    ) + (size ? 1 : 0);

  const activeChip = filterBy === "category" ? category : size;
  const setChip = (value: string | null) =>
    filterBy === "category" ? setCategory(value) : setSize(value);

  return (
    <>
      {filterBy === "category" && chips.length > 1 && (
        <ScrollTabs className="-mx-1 flex max-w-full items-center gap-6 border-b border-line px-1">
          {chips.map((chip, index) => {
            const isAll = index === 0;
            const active = isAll ? activeChip === null : chip.value === activeChip;
            const className = cn(
              "u-label -mb-px shrink-0 border-b-2 py-3 transition",
              active
                ? "border-ink text-ink"
                : chip.value === "sale"
                  ? "border-transparent text-clay hover:opacity-70"
                  : "border-transparent text-muted hover:text-ink",
            );
            return localCategoryFilter ? (
              <button
                key={chip.value}
                type="button"
                onClick={() => setChip(isAll ? null : chip.value)}
                className={className}
              >
                {chip.label}
              </button>
            ) : (
              <Link
                key={chip.value}
                href={isAll ? "/catalog" : `/catalog/${chip.value}`}
                className={className}
              >
                {chip.label}
              </Link>
            );
          })}
        </ScrollTabs>
      )}

      <div
        className={cn(
          "mb-8 flex flex-wrap items-center justify-between gap-4 border-line py-3.5 lg:mb-12",
          filterBy === "category" || tabsAbove ? "border-b" : "border-y",
        )}
      >
        {hasFilter ? (
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            className="u-label flex items-center gap-2 py-1"
          >
            Фільтр
            {activeFilters > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-ink text-[10px] tracking-normal text-bg">
                {activeFilters}
              </span>
            )}
            <ChevronIcon
              className={cn(
                "size-4 transition-transform duration-300",
                filterOpen && "rotate-180",
              )}
            />
          </button>
        ) : (
          <span />
        )}

        <div ref={sortRef} className="relative ml-auto shrink-0">
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
                className="absolute left-0 top-full z-sticky mt-2 w-[210px] max-w-[calc(100vw-2rem)] border border-line bg-bg py-1 shadow-[0_8px_30px_rgba(23,22,20,0.06)]"
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

        <AnimatePresence initial={false}>
          {hasFilter && filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="basis-full overflow-hidden"
            >
              <div className="space-y-5 pb-1 pt-3">
                {filterGroups.map((group) => (
                  <div key={group.label}>
                    <p className="u-label mb-2.5 text-muted">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.chips.map((chip) => (
                        <Link
                          key={chip.href}
                          href={chip.href}
                          className={cn(
                            "border px-2.5 py-1.5 text-[11px] leading-none transition",
                            chip.active
                              ? "border-ink bg-ink text-bg"
                              : "border-line hover:border-ink",
                          )}
                        >
                          {chip.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {showSizes && (
                  <div>
                    <p className="u-label mb-2.5 text-muted">Розмір</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allSizes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={size === item}
                          onClick={() => setSize(size === item ? null : item)}
                          className={cn(
                            "border px-2.5 py-1.5 text-[11px] leading-none transition",
                            size === item
                              ? "border-ink bg-ink text-bg"
                              : "border-line hover:border-ink",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} priorityCount={4} />
      ) : (
        <p className="u-body py-20 text-center">
          За цим фільтром зараз нічого немає. Спробуйте інший.
        </p>
      )}

      <p className="u-caption mt-10">
        {visible.length}{" "}
        {declOfNum(visible.length, ["товар", "товари", "товарів"])}
      </p>
    </>
  );
}
