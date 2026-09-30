"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
import Section from "@/components/shared/ui/Section";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Button from "@/components/shared/ui/Button";
import Reveal from "@/components/shared/ui/Reveal";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import AudienceTabs, { AudienceTab } from "@/components/homePage/AudienceTabs";
import { vyshyvanka } from "@/data/home";
import { Product } from "@/types/product";

export default function VyshyvankaSpotlight({
  all,
  girls,
  boys,
  babies,
}: {
  all: Product[];
  girls: Product[];
  boys: Product[];
  babies: Product[];
}) {
  const [tab, setTab] = useState<AudienceTab>("all");
  const products =
    tab === "all"
      ? all
      : tab === "divchatka"
        ? girls
        : tab === "khlopchyky"
          ? boys
          : babies;

  return (
    <Section tone="mist">
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
            <blockquote className="u-lead mt-8 border-l border-clay pl-5 font-normal">
              «{vyshyvanka.quote}»
            </blockquote>
          </Reveal>

          <div>
            <SectionHeading
              label={vyshyvanka.label}
              title={vyshyvanka.title}
              description={vyshyvanka.text}
              className="mb-0"
            />

            <AudienceTabs active={tab} onChange={setTab} className="mb-8 mt-9" />

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

            <Button href={vyshyvanka.cta.href} className="mt-12">
              {vyshyvanka.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
