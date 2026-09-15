"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { HeartIcon } from "@/components/shared/ui/Icons";

export default function FavoriteButton({
  slug,
  variant = "overlay",
  className,
}: {
  slug: string;
  /** overlay — on top of a product photo; plain — on the page background. */
  variant?: "overlay" | "plain";
  className?: string;
}) {
  const slugs = useFavoritesStore((state) => state.slugs);
  const toggle = useFavoritesStore((state) => state.toggle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active = mounted && slugs.includes(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-label={active ? "Прибрати з обраного" : "Додати в обране"}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center transition active:scale-90",
        variant === "overlay"
          ? cn("size-9 hover:scale-110", active ? "text-ink" : "text-white")
          : cn(
              "size-8 text-ink opacity-70 hover:opacity-100",
              active && "opacity-100",
            ),
        className,
      )}
    >
      <HeartIcon
        className={cn(
          "transition",
          variant === "overlay"
            ? cn(
                // Soft shadow keeps the white default heart legible on light photos.
                "size-[22px] drop-shadow-[0_1px_3px_rgba(23,22,20,0.35)]",
                active ? "fill-ink" : "fill-white",
              )
            : cn("size-[18px]", active && "fill-ink"),
        )}
      />
    </button>
  );
}
