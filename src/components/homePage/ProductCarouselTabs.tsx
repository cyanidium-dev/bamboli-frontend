"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCarousel from "@/components/homePage/ProductCarousel";
import AudienceTabs, { AudienceTab } from "@/components/homePage/AudienceTabs";

export default function ProductCarouselTabs({
  all,
  girls,
  boys,
  babies,
  label,
  perView,
  className,
}: {
  all: Product[];
  girls: Product[];
  boys: Product[];
  babies: Product[];
  label: string;
  perView?: 3 | 4;
  className?: string;
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
    <div>
      <AudienceTabs active={tab} onChange={setTab} />
      <ProductCarousel
        products={products}
        label={label}
        perView={perView}
        className={className}
      />
    </div>
  );
}
