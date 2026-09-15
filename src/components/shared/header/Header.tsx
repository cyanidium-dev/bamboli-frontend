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

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const nav: NavItem[] = [
  {
    href: "/catalog",
    label: "Одяг",
    children: [
      { href: "/catalog/dlya-malyukiv", label: "Для малюків" },
      { href: "/catalog/kostyumy", label: "Костюми" },
      { href: "/catalog/verkhniy-odyag", label: "Верхній одяг" },
      { href: "/catalog/sukni", label: "Сукні" },
      { href: "/catalog/aksesuary", label: "Аксесуари" },
    ],
  },
  { href: "/catalog/vyshyvanky", label: "Вишиванки" },
  { href: "/catalog/igrashky", label: "Іграшки" },
  { href: "/catalog/sale", label: "Знижки" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
];

const mobileExtra = [
  { href: "/delivery", label: "Доставка й оплата" },
  { href: "/size-guide", label: "Таблиця розмірів" },
  { href: "/blog", label: "Блог" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => setMenuOpen(false), [pathname]);

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
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group/drop relative">
                <Link href={item.href} className={cn(linkClass(item.href), "flex items-center gap-1")}>
                  {item.label}
                  <ChevronIcon className="size-3.5 transition-transform duration-300 group-hover/drop:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4 opacity-0 transition duration-300 group-focus-within/drop:visible group-focus-within/drop:opacity-100 group-hover/drop:visible group-hover/drop:opacity-100">
                  <ul className="w-[200px] border border-line bg-bg py-2 shadow-[0_8px_30px_rgba(23,22,20,0.06)]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-2.5 text-[13px] text-muted transition hover:bg-sand hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
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
            ),
          )}
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
              {nav.map((item) => (
                <div key={item.label} className="border-b border-line/70">
                  <Link href={item.href} className="u-label block py-4">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="-mt-1 flex flex-wrap gap-x-5 gap-y-2 pb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-[13px] text-muted"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
