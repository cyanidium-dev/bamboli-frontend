"use client";

import { cn } from "@/lib/utils";

export type AudienceTab = "all" | "divchatka" | "khlopchyky" | "malyuky";

const tabs: { key: AudienceTab; label: string }[] = [
  { key: "all", label: "Всі" },
  { key: "divchatka", label: "Дівчата" },
  { key: "khlopchyky", label: "Хлопчики" },
  { key: "malyuky", label: "Немовлята" },
];

export default function AudienceTabs({
  active,
  onChange,
  order,
  className,
}: {
  active: AudienceTab;
  onChange: (tab: AudienceTab) => void;
  /** Custom tab order; defaults to Всі, Дівчата, Хлопчики, Немовлята. */
  order?: AudienceTab[];
  className?: string;
}) {
  const visible = order
    ? order.map((key) => tabs.find((tab) => tab.key === key)!)
    : tabs;
  return (
    <div
      role="tablist"
      aria-label="Для кого"
      className={cn(
        "no-scrollbar -mx-1 mb-6 flex max-w-full items-center gap-1.5 overflow-x-auto px-1",
        className,
      )}
    >
      {visible.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "shrink-0 border px-2.5 py-1.5 text-[11px] leading-none transition",
            active === tab.key
              ? "border-ink bg-ink text-bg"
              : "border-line hover:border-ink",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
