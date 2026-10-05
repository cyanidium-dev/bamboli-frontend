"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronIcon } from "@/components/shared/ui/Icons";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Custom single-select list: a trigger plus a panel of options. Closes on an
 * outside click or Escape. Same look as the catalog sort menu.
 */
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  align = "right",
  fullWidth = false,
  className,
  triggerClassName,
}: {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  /** Shown on the trigger while nothing is selected. */
  placeholder?: string;
  align?: "left" | "right";
  /** Panel as wide as the trigger instead of a fixed width. */
  fullWidth?: boolean;
  className?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "u-label flex items-center gap-1.5 py-1",
          triggerClassName,
        )}
      >
        {selected?.label ?? placeholder}
        <ChevronIcon
          className={cn(
            "size-4 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-full z-sticky mt-2 thin-scrollbar max-h-72 overflow-y-auto border border-line bg-bg py-1 shadow-[0_8px_30px_rgba(23,22,20,0.06)]",
              align === "right" ? "right-0" : "left-0",
              fullWidth ? "w-full" : "w-[210px] max-w-[calc(100vw-2rem)]",
            )}
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
              >
                <button
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full px-4 py-2.5 text-left text-[12px] transition",
                    option.disabled
                      ? "cursor-not-allowed text-muted/45 line-through"
                      : "hover:bg-sand",
                    !option.disabled &&
                      (option.value === value ? "text-ink" : "text-muted"),
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
  );
}
