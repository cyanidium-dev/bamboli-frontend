"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
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
import { siteInfo } from "@/data/siteInfo";
import { headerMegaMenus, headerSimpleLinks, type NavMenu } from "@/data/navigation";

const mobileExtra = [
  { href: "/delivery", label: "Доставка й оплата" },
  { href: "/size-guide", label: "Таблиця розмірів" },
  { href: "/blog", label: "Блог" },
];

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
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

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
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-bg",
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

          <Link
            href="/"
            aria-label="Bamboli — головна"
            className="u-display shrink-0 text-[24px] leading-none tracking-[0.18em] lg:text-[28px]"
          >
            BAMBOLI
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-8">
          {headerMegaMenus.map((menu) => {
            const isOpen = openDesktopMenu === menu.label;
            return (
              <div
                key={menu.label}
                className="relative"
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
                    "absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4 transition duration-300",
                    isOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <div className="flex w-[min(88vw,880px)] gap-8 border border-line bg-bg p-7 shadow-[0_8px_30px_rgba(23,22,20,0.06)]">
                    <div className="flex flex-1 flex-wrap gap-x-8 gap-y-6">
                      {menu.columns.map((column) => (
                        <div key={column.title} className="min-w-[150px] flex-1">
                          <Link
                            href={column.href}
                            className="u-label mb-3 block text-[12px] text-ink transition hover:opacity-60"
                            onClick={() => setOpenDesktopMenu(null)}
                          >
                            {column.title}
                          </Link>
                          <ul className="flex flex-col gap-2">
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block text-[13px] text-muted transition hover:text-ink"
                                  onClick={() => setOpenDesktopMenu(null)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex w-[150px] shrink-0 flex-col gap-3 border-l border-line pl-7">
                      <Link
                        href={menu.href}
                        className="u-underline self-start text-[13px] text-ink transition hover:opacity-60"
                        onClick={() => setOpenDesktopMenu(null)}
                      >
                        {menu.allLabel}
                      </Link>
                      <Link
                        href="/catalog/sale"
                        className="u-underline self-start text-[13px] text-clay transition hover:opacity-70"
                        onClick={() => setOpenDesktopMenu(null)}
                      >
                        SALE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {headerSimpleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                linkClass(item.href),
                item.href === "/catalog/sale" && "text-clay hover:text-clay",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 lg:gap-2">
          <Link
            href="/catalog"
            aria-label="Пошук"
            className="flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <SearchIcon className="size-[19px]" />
          </Link>

          <Link
            href="/favorites"
            aria-label="Обране"
            className="flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <HeartIcon className="size-[19px]" />
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
            className="max-h-[calc(100dvh-62px)] overflow-y-auto border-t border-line bg-bg xl:hidden"
          >
            <Container className="flex flex-col py-2">
              {headerMegaMenus.map((menu) => (
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
              ))}
              {headerSimpleLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "u-label block border-b border-line/70 py-4",
                    item.href === "/catalog/sale" && "text-clay",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {mobileExtra.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line/70 py-3.5 text-[13px] text-muted"
                >
                  {item.label}
                </Link>
              ))}

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
        className="u-label flex w-full items-center justify-between py-4"
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
              <Link href={menu.href} className="py-2 text-[13px] text-ink">
                {menu.allLabel}
              </Link>
              {menu.columns.map((column) => (
                <div key={column.title} className="border-t border-line/50 pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleGroup(column.title)}
                    aria-expanded={openGroup === column.title}
                    className="flex w-full items-center justify-between py-2 text-[13px] text-ink"
                  >
                    {column.title}
                    <ChevronIcon
                      className={cn(
                        "size-3 transition-transform duration-300",
                        openGroup === column.title && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openGroup === column.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-x-5 gap-y-2 py-2 pl-3">
                          {column.links.map((link) => (
                            <Link key={link.href} href={link.href} className="text-[13px] text-muted">
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link href="/catalog/sale" className="pt-2 text-[13px] text-clay">
                SALE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
