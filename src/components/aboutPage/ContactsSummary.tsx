import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import { InstagramIcon, TelegramIcon } from "@/components/shared/ui/Icons";
import { siteInfo } from "@/data/siteInfo";

export default function ContactsSummary() {
  return (
    <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="u-label mb-3 text-muted">Контакти</p>
            <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
              Завжди на зв&apos;язку
            </h2>
            <p className="mt-5 max-w-[380px] text-[13px] leading-relaxed text-muted">
              Питання про розмір, наявність чи замовлення — пишіть у зручний
              месенджер, відповідаємо щодня.
            </p>

            <Link
              href="/contacts"
              className="u-label mt-9 inline-block border-b border-ink pb-1 transition hover:opacity-60"
            >
              Усі контакти
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <ul className="space-y-3 text-[13px]">
              <li>
                <a
                  href={siteInfo.phoneHref}
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  <TelegramIcon className="size-4" />
                  Telegram {siteInfo.telegram.handle}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  <InstagramIcon className="size-4" />
                  Instagram Direct {siteInfo.instagram.handle}
                </a>
              </li>
            </ul>

            <ul className="space-y-1.5 text-[13px] text-muted">
              <li className="u-label mb-2 text-ink">Реквізити</li>
              <li>{siteInfo.legalName}</li>
              <li>ЄДРПОУ {siteInfo.edrpou}</li>
              <li>{siteInfo.address}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
