"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BlogCategory, BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";

const PAGE_SIZE = 6;

/**
 * Category filter + pagination — docs/spec/marketing-structure.md §3.11:
 * "фільтр за темами ... картки статей, пагінація". Filtering happens
 * client-side over the already-fetched post list, mirroring `CatalogView`.
 */
export default function BlogView({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (category ? posts.filter((post) => post.category === category) : posts),
    [posts, category],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategory = (slug: string | null) => {
    setCategory(slug);
    setPage(1);
    scrollToTop();
  };

  const handlePage = (pageNumber: number) => {
    setPage(pageNumber);
    scrollToTop();
  };

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2 lg:mb-14">
        <button
          type="button"
          onClick={() => handleCategory(null)}
          className={cn(
            "u-label border px-4 py-2.5 transition",
            category === null ? "border-ink bg-ink text-bg" : "border-line hover:border-ink",
          )}
        >
          Усі теми
        </button>
        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => handleCategory(item.slug)}
            className={cn(
              "u-label border px-4 py-2.5 transition",
              category === item.slug
                ? "border-ink bg-ink text-bg"
                : "border-line hover:border-ink",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {paged.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category ?? "all"}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16"
          >
            {paged.map((post, index) => (
              <BlogCard key={post.id} post={post} priority={index < 2} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="py-16 text-center text-[13px] text-muted">
          У цій темі поки немає статей.
        </p>
      )}

      {pageCount > 1 && (
        <nav
          aria-label="Пагінація"
          className="mt-16 flex items-center justify-center gap-2 lg:mt-20"
        >
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePage(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn(
                "u-label flex size-9 items-center justify-center border transition",
                pageNumber === page
                  ? "border-ink bg-ink text-bg"
                  : "border-line hover:border-ink",
              )}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
