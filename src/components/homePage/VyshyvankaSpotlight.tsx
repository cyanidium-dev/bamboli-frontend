"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { vyshyvanka } from "@/data/home";
import { cn } from "@/lib/utils";
import { Audience, Product } from "@/types/product";

const tabs: { key: Audience; label: string }[] = [
  { key: "girls", label: "Дівчатка" },
  { key: "boys", label: "Хлопчики" },
];

export default function VyshyvankaSpotlight({
  girls,
  boys,
}: {
  girls: Product[];
  boys: Product[];
}) {
  const [tab, setTab] = useState<Audience>("girls");
  const products = tab === "girls" ? girls : boys;

  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-sand">
              <Image
                src={vyshyvanka.image.src}
                alt={vyshyvanka.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <blockquote className="u-display mt-8 border-l border-clay pl-5 text-[22px] leading-[1.3] lg:text-[26px]">
              «{vyshyvanka.quote}»
            </blockquote>
          </Reveal>

          <div>
            <p className="u-label mb-3 text-muted">{vyshyvanka.label}</p>
            <h2 className="u-display text-[30px] leading-[1.1] lg:text-[44px]">
              {vyshyvanka.title}
            </h2>
            <p className="mt-5 max-w-[480px] text-[13px] leading-relaxed text-muted">
              {vyshyvanka.text}
            </p>

            <div
              role="tablist"
              aria-label="Для кого"
              className="mb-8 mt-9 flex gap-1.5 border-b border-line"
            >
              {tabs.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.key}
                  onClick={() => setTab(item.key)}
                  className={cn(
                    "u-label relative -mb-px border-b px-1 pb-3 pt-1 transition-colors mr-5",
                    tab === item.key
                      ? "border-ink text-ink"
                      : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductGrid
                  products={products}
                  priorityCount={0}
                  className="md:grid-cols-2 xl:grid-cols-2"
                />
              </motion.div>
            </AnimatePresence>

            <Link
              href={vyshyvanka.cta.href}
              className="u-label mt-12 inline-block border border-ink bg-ink px-7 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
            >
              {vyshyvanka.cta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
