"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";
import {
  accessorySubcategories,
  odyagGroups,
  toyBrands,
  toySubcategories,
} from "@/data/categoryTree";

type CategoryKey = "odyag" | "igrashky" | "aksesuary";

const catalogSections: { key: CategoryKey; title: string; href: string }[] = [
  { key: "odyag", title: "Одяг", href: "/catalog/odyag" },
  { key: "igrashky", title: "Іграшки", href: "/catalog/igrashky" },
  { key: "aksesuary", title: "Аксесуари", href: "/catalog/aksesuary" },
];

export default function FooterCatalogMenu() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<CategoryKey | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px]"
      >
        <span className="u-underline">Інформація</span>
        <ChevronIcon
          className={cn("size-3 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pt-2.5 pl-3">
              {catalogSections.map((section) => {
                const isOpen = openSection === section.key;
                return (
                  <div key={section.key}>
                    <div className="flex items-center gap-1.5 py-1.5">
                      <Link href={section.href} className="text-[13px] text-ink">
                        {section.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSection((current) => (current === section.key ? null : section.key))
                        }
                        aria-label={`Розгорнути ${section.title}`}
                        aria-expanded={isOpen}
                        className="flex size-6 items-center justify-center text-muted"
                      >
                        <ChevronIcon
                          className={cn(
                            "size-3 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pl-3"
                        >
                          <div className="flex flex-col gap-1 pb-2">
                            {section.key === "odyag" &&
                              odyagGroups.map((group) => {
                                const isGroupOpen = openGroup === group.slug;
                                return (
                                  <div key={group.slug}>
                                    <div className="flex items-center gap-1.5 py-1.5">
                                      <Link
                                        href={`/catalog/odyag/${group.slug}`}
                                        className="text-[12px] text-ink"
                                      >
                                        {group.title}
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenGroup((current) =>
                                            current === group.slug ? null : group.slug,
                                          )
                                        }
                                        aria-label={`Розгорнути ${group.title}`}
                                        aria-expanded={isGroupOpen}
                                        className="flex size-5 items-center justify-center text-muted"
                                      >
                                        <ChevronIcon
                                          className={cn(
                                            "size-2.5 transition-transform duration-300",
                                            isGroupOpen && "rotate-180",
                                          )}
                                        />
                                      </button>
                                    </div>
                                    <AnimatePresence initial={false}>
                                      {isGroupOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                          className="overflow-hidden pl-3"
                                        >
                                          <div className="flex flex-col gap-1.5 pb-1.5">
                                            {group.subcategories.map((sub) => (
                                              <Link
                                                key={sub.slug}
                                                href={`/catalog/odyag/${group.slug}/${sub.slug}`}
                                                className="text-[12px] text-muted transition hover:text-ink"
                                              >
                                                {sub.title}
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}

                            {section.key === "igrashky" && (
                              <>
                                {toySubcategories.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/catalog/igrashky/${sub.slug}`}
                                    className="py-1.5 text-[12px] text-ink"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                                {toyBrands.length > 0 && (
                                  <>
                                    <p className="pt-1.5 text-[10px] uppercase text-muted">Бренди</p>
                                    {toyBrands.map((brand) => (
                                      <Link
                                        key={brand.slug}
                                        href={`/catalog/igrashky/brend/${brand.slug}`}
                                        className="py-1.5 text-[12px] text-ink"
                                      >
                                        {brand.name}
                                      </Link>
                                    ))}
                                  </>
                                )}
                              </>
                            )}

                            {section.key === "aksesuary" &&
                              accessorySubcategories.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={`/catalog/aksesuary/${sub.slug}`}
                                  className="py-1.5 text-[12px] text-ink"
                                >
                                  {sub.title}
                                </Link>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
