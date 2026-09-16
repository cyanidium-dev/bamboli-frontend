"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "@/types/product";
import { cn, formatPrice, hasPriceRange, priceForSize } from "@/lib/utils";
import ColorSwatches from "@/components/shared/productCard/ColorSwatches";
import FavoriteButton from "@/components/shared/productCard/FavoriteButton";
import { useAddToCart } from "@/components/shared/addToCart/useAddToCart";
import { useCartStore } from "@/store/cartStore";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import SizeGuideModal from "@/components/productPage/SizeGuideModal";
import ProductGallery from "@/components/productPage/ProductGallery";

export default function ProductView({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>("Опис");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const addToCart = useAddToCart();
  const openCart = useCartStore((state) => state.open);

  const color = product.colors[colorIndex];
  const hasSizes = color.sizes.length > 0;
  const { price, oldPrice } = priceForSize(product, size);

  const handleColorChange = (index: number) => {
    setColorIndex(index);
    setSize(null);
    setError(false);
  };

  const handleAdd = () => {
    if (hasSizes && !size) {
      setError(true);
      return;
    }
    addToCart({
      product,
      colorId: color.id,
      size,
      origin: galleryRef.current,
    });
    window.setTimeout(openCart, 900);
  };

  const accordion = [
    { title: "Опис", body: product.description },
    {
      title: "Характеристики",
      body: product.details
        .map((detail) => `${detail.label}: ${detail.value}`)
        .join("\n"),
    },
    {
      title: "Доставка й повернення",
      body: "Нова Пошта та кур'єр по Києву. Відправка наступного робочого дня. Обмін і повернення — 14 днів, за наш рахунок.",
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div ref={galleryRef}>
        <ProductGallery
          key={color.id}
          images={color.images}
          alt={`${product.title} — ${color.name}`}
        />
      </div>

      <div className="lg:sticky lg:top-[110px] lg:self-start">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="u-display text-[28px] leading-[1.12] lg:text-[38px]">
              {product.title}
            </h1>
            <p className="mt-2 text-[12px] text-muted">{product.subtitle}</p>
          </div>
          <FavoriteButton slug={product.slug} variant="plain" />
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span
            className={cn("text-[18px] tabular-nums", oldPrice && "text-clay")}
          >
            {!size && hasPriceRange(product) && "від "}
            {formatPrice(price)}
          </span>
          {oldPrice && (
            <span className="text-[14px] text-muted line-through tabular-nums">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-9">
          <p className="u-label mb-3 text-muted">
            Колір — <span className="text-ink">{color.name}</span>
          </p>
          <ColorSwatches
            colors={product.colors}
            activeIndex={colorIndex}
            onChange={handleColorChange}
            size="md"
          />
        </div>

        {hasSizes && (
          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="u-label text-muted">
                Розмір{size ? " — " : ""}
                {size && <span className="text-ink">{size}</span>}
              </p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="u-label text-muted underline underline-offset-4 transition hover:text-ink"
              >
                Таблиця розмірів
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {color.sizes.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  disabled={!item.inStock}
                  onClick={() => {
                    setSize(item.label);
                    setError(false);
                  }}
                  className={cn(
                    "min-w-12 border px-3 py-2.5 text-[12px] leading-none transition",
                    !item.inStock &&
                      "cursor-not-allowed border-line text-muted/45 line-through",
                    item.inStock &&
                      item.label === size &&
                      "border-ink bg-ink text-bg",
                    item.inStock &&
                      item.label !== size &&
                      "border-line hover:border-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2.5 text-[11px] text-clay"
                >
                  Оберіть розмір, щоб додати в кошик
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        <button
          type="button"
          onClick={handleAdd}
          className="u-label mt-9 w-full border border-ink bg-ink px-6 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
        >
          Додати в кошик
        </button>

        <p className="mt-3 text-center text-[11px] text-muted">
          Безкоштовна доставка від 2 500 ₴
        </p>

        <div className="mt-10 border-t border-line">
          {accordion.map((section) => {
            const open = openDetail === section.title;
            return (
              <div key={section.title} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenDetail(open ? null : section.title)}
                  aria-expanded={open}
                  className="u-label flex w-full items-center justify-between py-4 text-left"
                >
                  {section.title}
                  <ChevronIcon
                    className={cn(
                      "size-4 transition-transform duration-400",
                      open && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="whitespace-pre-line pb-5 text-[13px] leading-relaxed text-muted">
                        {section.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={closeSizeGuide} />
    </div>
  );
}
