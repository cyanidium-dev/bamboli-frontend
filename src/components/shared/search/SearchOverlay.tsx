"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
import Backdrop from "@/components/shared/ui/Backdrop";
import { CloseIcon, SearchIcon } from "@/components/shared/ui/Icons";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { Product } from "@/types/product";
import { declOfNum } from "@/lib/utils";
import { useSearchStore } from "@/store/searchStore";

const MIN_QUERY_LENGTH = 2;
const RESULTS_LIMIT = 24;

function matches(product: Product, query: string) {
  return [product.title, product.subtitle, product.brand]
    .filter(Boolean)
    .some((field) => field!.toLowerCase().includes(query));
}

export default function SearchOverlay({ products }: { products: Product[] }) {
  const isOpen = useSearchStore((state) => state.isOpen);
  const close = useSearchStore((state) => state.close);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [isOpen]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) return [];
    return products.filter((product) => matches(product, trimmed)).slice(0, RESULTS_LIMIT);
  }, [products, trimmed]);

  return (
    <>
      <Backdrop isVisible={isOpen} onClose={close} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-0 z-[100] flex max-h-dvh flex-col overflow-y-auto bg-bg"
            role="dialog"
            aria-label="Пошук товарів"
          >
            <Container className="flex flex-col py-5 lg:py-7">
              <div className="flex items-center gap-3">
                <SearchIcon className="size-[18px] shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="search"
                  enterKeyHint="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Пошук товарів…"
                  className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted lg:text-[16px]"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Закрити пошук"
                  className="-mr-2 flex size-9 shrink-0 items-center justify-center transition hover:opacity-60"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              {trimmed.length >= MIN_QUERY_LENGTH && (
                <div className="mt-6 border-t border-line pt-6">
                  {results.length > 0 ? (
                    <>
                      <p className="mb-5 text-[12px] text-muted">
                        {results.length}{" "}
                        {declOfNum(results.length, ["товар", "товари", "товарів"])}
                      </p>
                      <ProductGrid products={results} priorityCount={4} />
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-10 text-center">
                      <p className="u-display text-[20px]">Нічого не знайдено</p>
                      <p className="text-[13px] text-muted">
                        Спробуйте інший запит або перегляньте{" "}
                        <Link href="/catalog" onClick={close} className="border-b border-ink text-ink">
                          весь каталог
                        </Link>
                        .
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
