import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Logo from "@/components/shared/ui/Logo";
import TagIcon from "@/components/shared/icons/TagIcon";
import { categories } from "@/data/categories";
import { siteInfo } from "@/data/siteInfo";

const buyers = [
  { href: "/delivery", label: "Доставка та оплата" },
  { href: "/delivery#returns", label: "Обмін і повернення" },
  { href: "/size-guide", label: "Таблиця розмірів" },
  { href: "/blog", label: "Блог" },
];

const socials = [
  { href: siteInfo.instagram.url, label: "Instagram" },
  { href: siteInfo.telegram.url, label: "Telegram" },
  { href: siteInfo.threads.url, label: "Threads" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div>
            <Logo className="mb-4 w-[140px]" />
            <p className="max-w-[300px] text-[13px] text-muted">
              Базовий дитячий одяг як у дорослих. Шиємо у Львові з натуральних
              тканин — з любов&apos;ю до кожної деталі.
            </p>
            <ul className="mt-6 flex gap-5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-label u-underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 text-muted">Каталог</p>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/catalog/${category.slug}`}
                    className="u-underline text-[13px]"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog/sale" className="u-underline text-[13px] text-clay">
                  Знижки
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 text-muted">Покупцям</p>
            <ul className="space-y-2.5">
              {buyers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="u-underline text-[13px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 text-muted">Контакти</p>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href={siteInfo.phoneHref} className="u-underline">
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`} className="u-underline">
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline"
                >
                  {siteInfo.address}
                </a>
              </li>
              <li className="text-muted">{siteInfo.hours}</li>
              <li className="pt-2">
                <Link href="/contacts" className="u-label border-b border-ink pb-1">
                  Усі контакти
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[11px] text-muted lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2">
            {["MonoPay", "LiqPay", "Нова Пошта"].map((item) => (
              <li key={item} className="u-label border border-line px-2.5 py-1.5">
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/offer" className="transition hover:text-ink">
              Публічна оферта
            </Link>
            <Link href="/privacy" className="transition hover:text-ink">
              Політика конфіденційності
            </Link>
            <p>© {new Date().getFullYear()} Bamboli</p>
          </div>

          <div>
            <p className="text-[8px] leading-[120%] font-medium uppercase">
              Created by:
            </p>
            <a
              href={siteInfo.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] leading-[120%] transition-colors duration-300 hover:text-ink"
            >
              {siteInfo.developer.name} <TagIcon className="mb-1" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
