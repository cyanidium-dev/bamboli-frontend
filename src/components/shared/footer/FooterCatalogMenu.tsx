"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";
import { headerMegaMenus, type NavColumn } from "@/data/navigation";

const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

/**
 * Footer «Каталог» column: Одяг, Іграшки, Аксесуари as links, each with a
 * toggle that reveals the same subcategories as the header menu.
 */
export default function FooterCatalogMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <>
      {headerMegaMenus.map((menu) => {
        const isOpen = openMenu === menu.label;
        return (
          <li key={menu.label}>
            <div className="flex items-center gap-1.5">
              <Link href={menu.href} className="u-underline text-[13px]">
                {menu.label}
              </Link>
              {menu.columns.length > 0 && (
                <ToggleButton
                  label={menu.label}
                  open={isOpen}
                  onClick={() => setOpenMenu((current) => (current === menu.label ? null : menu.label))}
                />
              )}
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  {...expand}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-3"
                >
                  <div className="flex flex-col gap-1 pt-2 pb-1">
                    {menu.columns.map((column) => (
                      <FooterColumn
                        key={column.title}
                        column={column}
                        open={openGroup === `${menu.label}/${column.title}`}
                        onToggle={() => {
                          const key = `${menu.label}/${column.title}`;
                          setOpenGroup((current) => (current === key ? null : key));
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </>
  );
}

function FooterColumn({
  column,
  open,
  onToggle,
}: {
  column: NavColumn;
  open: boolean;
  onToggle: () => void;
}) {
  if (column.links.length === 0) {
    return column.href ? (
      <Link href={column.href} className="py-1 text-[12px] text-ink">
        {column.title}
      </Link>
    ) : null;
  }

  // Plain heading (e.g. «Бренди») — its links are always shown.
  if (!column.href) {
    return (
      <div className="pt-1.5">
        <p className="text-[10px] uppercase text-muted">{column.title}</p>
        <div className="flex flex-col">
          {column.links.map((link) => (
            <Link key={link.href} href={link.href} className="py-1 text-[12px] text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1.5 py-1">
        <Link href={column.href} className="text-[12px] text-ink">
          {column.title}
        </Link>
        <ToggleButton label={column.title} open={open} onClick={onToggle} small />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            {...expand}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pl-3"
          >
            <div className="flex flex-col gap-1.5 pb-1.5">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-muted transition hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleButton({
  label,
  open,
  onClick,
  small = false,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Розгорнути ${label}`}
      aria-expanded={open}
      className={cn("flex items-center justify-center text-muted", small ? "size-5" : "size-6")}
    >
      <ChevronIcon
        className={cn(
          "transition-transform duration-300",
          small ? "size-2.5" : "size-3",
          open && "rotate-180",
        )}
      />
    </button>
  );
}
