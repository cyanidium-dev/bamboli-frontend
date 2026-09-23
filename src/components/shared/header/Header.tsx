"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
import Logo from "@/components/shared/ui/Logo";
import {
  BagIcon,
  ChevronIcon,
  CloseIcon,
  HeartIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  TelegramIcon,
} from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useSearchStore } from "@/store/searchStore";
import { siteInfo } from "@/data/siteInfo";
import {
  headerInfoLinks,
  headerMegaMenus,
  saleLink,
  type NavLink,
  type NavMenu,
} from "@/data/navigation";

/** «Інформація» dropdown — service pages rendered as one list, like Аксесуари. */
const infoMenu: NavMenu = {
  label: "Інформація",
  href: headerInfoLinks[0].href,
  columns: headerInfoLinks.map((link) => ({ title: link.label, href: link.href, links: [] })),
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.open);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = useFavoritesStore((state) => state.slugs.length);
  const openSearch = useSearchStore((state) => state.open);
  const closeSearch = useSearchStore((state) => state.close);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileMenu(null);
    setOpenMobileGroup(null);
    setOpenDesktopMenu(null);
    closeSearch();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, closeSearch]);

  const linkClass = (href: string) =>
    cn(
      "u-underline u-label py-1 transition-colors duration-300",
      pathname === href ? "text-ink" : "text-muted hover:text-ink",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-[80] transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-mist/85 backdrop-blur-md"
          : "border-b border-transparent bg-mist",
      )}
    >
      <Container className="flex h-[62px] items-center justify-between gap-4 lg:h-[74px]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Меню"
            aria-expanded={menuOpen}
            className="-ml-1 flex size-9 items-center justify-center xl:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>

          <Link href="/" aria-label="Bamboli — головна" className="shrink-0">
            <Logo />
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-4 self-stretch xl:flex 2xl:gap-6">
          {headerMegaMenus.map((menu) => {
            if (menu.columns.length === 0) {
              return (
                <Link key={menu.label} href={menu.href} className={linkClass(menu.href)}>
                  {menu.label}
                </Link>
              );
            }
            const isOpen = openDesktopMenu === menu.label;
            return (
              // The item spans the header's full height so the pointer can
              // reach the panel, which hangs left-aligned under its label.
              <div
                key={menu.label}
                className="relative flex items-center self-stretch"
                onMouseEnter={() => setOpenDesktopMenu(menu.label)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <Link
                  href={menu.href}
                  className={cn(linkClass(menu.href), "flex items-center gap-1")}
                  onFocus={() => setOpenDesktopMenu(menu.label)}
                  onClick={() => setOpenDesktopMenu(null)}
                >
                  {menu.label}
                  <ChevronIcon
                    className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                  />
                </Link>
                <div
                  className={cn(
                    "absolute -left-8 top-full z-40 transition duration-300",
                    isOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <DesktopMegaPanel menu={menu} onNavigate={() => setOpenDesktopMenu(null)} />
                </div>
              </div>
            );
          })}
          <Link
            href={saleLink.href}
            className={cn(linkClass(saleLink.href), "text-clay hover:text-clay")}
          >
            {saleLink.label}
          </Link>
          <div
            className="relative flex items-center self-stretch"
            onMouseEnter={() => setOpenDesktopMenu(infoMenu.label)}
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <button
              type="button"
              aria-expanded={openDesktopMenu === infoMenu.label}
              onFocus={() => setOpenDesktopMenu(infoMenu.label)}
              onClick={() =>
                setOpenDesktopMenu((current) => (current === infoMenu.label ? null : infoMenu.label))
              }
              className={cn(
                "u-underline u-label flex items-center gap-1 py-1 transition-colors duration-300",
                headerInfoLinks.some((link) => link.href === pathname)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {infoMenu.label}
              <ChevronIcon
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  openDesktopMenu === infoMenu.label && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "absolute -left-8 top-full z-40 transition duration-300",
                openDesktopMenu === infoMenu.label ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <DesktopMegaPanel menu={infoMenu} onNavigate={() => setOpenDesktopMenu(null)} />
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-end gap-1 lg:gap-2">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Пошук"
            className="flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <SearchIcon className="size-[19px]" />
          </button>

          <Link
            href="/favorites"
            aria-label={`Обране, ${favoritesCount} товарів`}
            className="relative flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <HeartIcon className="size-[19px]" />
            <AnimatePresence>
              {mounted && favoritesCount > 0 && (
                <motion.span
                  key={favoritesCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] leading-4 text-bg tabular-nums"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            id="cart-anchor"
            type="button"
            onClick={openCart}
            aria-label={`Кошик, ${count} товарів`}
            className="relative flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <BagIcon className="size-[19px]" />
            <AnimatePresence>
              {mounted && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] leading-4 text-bg tabular-nums"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-62px)] overflow-y-auto border-t border-line bg-mist xl:hidden"
          >
            <Container className="flex flex-col py-2">
              {headerMegaMenus.map((menu) =>
                menu.columns.length === 0 ? (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    className="u-label block border-b border-line/70 py-4"
                  >
                    {menu.label}
                  </Link>
                ) : (
                <MobileMegaMenu
                  key={menu.label}
                  menu={menu}
                  open={openMobileMenu === menu.label}
                  onToggle={() =>
                    setOpenMobileMenu((current) => (current === menu.label ? null : menu.label))
                  }
                  openGroup={openMobileGroup}
                  onToggleGroup={(title) =>
                    setOpenMobileGroup((current) => (current === title ? null : title))
                  }
                />
                ),
              )}
              <Link
                href={saleLink.href}
                className="u-label block border-b border-line/70 py-4 text-clay"
              >
                {saleLink.label}
              </Link>
              <MobileLinkGroup
                label="Інформація"
                links={headerInfoLinks}
                open={openMobileMenu === "Інформація"}
                onToggle={() =>
                  setOpenMobileMenu((current) => (current === "Інформація" ? null : "Інформація"))
                }
              />

              <div className="flex flex-wrap items-center gap-5 py-5 text-[13px]">
                <a href={siteInfo.phoneHref}>{siteInfo.phone}</a>
                <a
                  href={siteInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={siteInfo.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="size-5" />
                </a>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMegaMenu({
  menu,
  open,
  onToggle,
  openGroup,
  onToggleGroup,
}: {
  menu: NavMenu;
  open: boolean;
  onToggle: () => void;
  openGroup: string | null;
  onToggleGroup: (title: string) => void;
}) {
  return (
    <div className="border-b border-line/70">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="u-label flex w-full items-center gap-2 py-4"
      >
        {menu.label}
        <ChevronIcon className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
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
            <div className="flex flex-col gap-1 pb-4">
              {menu.allLabel && (
                <Link href={menu.href} className="py-2 text-[13px] text-ink">
                  {menu.allLabel}
                </Link>
              )}
              {menu.columns.map((column) => {
                const groupKey = `${menu.label}/${column.title}`;
                const groupOpen = openGroup === groupKey;

                if (column.links.length === 0) {
                  return column.href ? (
                    <Link
                      key={column.title}
                      href={column.href}
                      className="border-t border-line/50 py-2 text-[13px] text-ink"
                    >
                      {column.title}
                    </Link>
                  ) : null;
                }

                // Plain heading (e.g. «Бренди») — its links are always shown.
                if (!column.href) {
                  return (
                    <div key={column.title} className="border-t border-line/50 pt-3">
                      <p className="u-label text-muted">{column.title}</p>
                      <div className="flex flex-col pt-1">
                        {column.links.map((link) => (
                          <Link key={link.href} href={link.href} className="py-2 text-[13px] text-ink">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={column.title} className="border-t border-line/50">
                    <div className="flex items-center gap-1">
                      <Link href={column.href} className="py-2 text-[13px] text-ink">
                        {column.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => onToggleGroup(groupKey)}
                        aria-label={`Розгорнути ${column.title}`}
                        aria-expanded={groupOpen}
                        className="flex size-8 items-center justify-center text-muted"
                      >
                        <ChevronIcon
                          className={cn(
                            "size-3 transition-transform duration-300",
                            groupOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {groupOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pb-2 pl-4">
                            {column.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="py-1.5 text-[13px] text-muted"
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
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLinkGroup({
  label,
  links,
  open,
  onToggle,
}: {
  label: string;
  links: NavLink[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line/70">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="u-label flex w-full items-center gap-2 py-4"
      >
        {label}
        <ChevronIcon className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
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
            <div className="flex flex-col pb-4">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-2 text-[13px] text-ink",
                    index > 0 && "border-t border-line/50",
                  )}
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

/**
 * Desktop dropdown. Columns with their own links (clothing groups, «Бренди»)
 * get a heading and a list; bare subcategory columns (toys, accessories) are
 * merged into one list so they don't scatter as lone headings.
 */
function DesktopMegaPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const leaves = menu.columns.filter((column) => column.links.length === 0 && column.href);
  const groups = menu.columns.filter((column) => column.links.length > 0);

  return (
    <div className="flex w-max max-w-[88vw] flex-wrap gap-x-12 gap-y-6 border border-line bg-bg px-8 py-6 shadow-[0_8px_30px_rgba(23,22,20,0.06)]">
      {leaves.length > 0 && (
        <ul className="space-y-3">
          {leaves.map((column) => (
            <li key={column.title}>
              <Link
                href={column.href!}
                className="u-label block text-[12px] text-ink transition hover:opacity-60"
                onClick={onNavigate}
              >
                {column.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {groups.map((column) => (
        <div key={column.title}>
          {column.href ? (
            <Link
              href={column.href}
              className="u-label block text-[12px] text-ink transition hover:opacity-60"
              onClick={onNavigate}
            >
              {column.title}
            </Link>
          ) : (
            <p className="u-label text-[12px] text-muted">{column.title}</p>
          )}
          <ul className="mt-3 space-y-2">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-muted transition hover:text-ink"
                  onClick={onNavigate}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
