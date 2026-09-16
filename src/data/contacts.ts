/**
 * Static content of the «Контакти» page (not in Sanity by the brief).
 * Structure follows docs/spec/marketing-structure.md § 3.8a.
 */

import { siteInfo } from "@/data/siteInfo";
import { showroom } from "@/data/about";

export const contactsHero = {
  title: "Контакти",
  text: "Відповідаємо щодня — пишіть, як вам зручно.",
};

export type ContactCardKind =
  | "phone"
  | "mail"
  | "telegram"
  | "instagram"
  | "threads";

export const contactCards: {
  kind: ContactCardKind;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}[] = [
  {
    kind: "phone",
    label: "Телефон",
    value: siteInfo.phone,
    href: siteInfo.phoneHref,
  },
  {
    kind: "mail",
    label: "Email",
    value: siteInfo.email,
    href: `mailto:${siteInfo.email}`,
  },
  {
    kind: "telegram",
    label: "Telegram",
    value: siteInfo.telegram.handle,
    href: siteInfo.telegram.url,
    external: true,
  },
  {
    kind: "instagram",
    label: "Instagram Direct",
    value: siteInfo.instagram.handle,
    href: siteInfo.instagram.url,
    external: true,
  },
  {
    kind: "threads",
    label: "Threads",
    value: siteInfo.threads.handle,
    href: siteInfo.threads.url,
    external: true,
  },
];

export const onlineHours = `Онлайн-підтримка: ${siteInfo.hours}`;

export const contactsShowroom = {
  label: "Шоурум у Львові",
  title: "Приходьте приміряти наживо",
  image: showroom.image,
  note: "Тут можна приміряти одяг і подивитися іграшки та посуд Bamboli.",
  ctaLabel: "Прокласти маршрут",
};

export const quickAnswers: { label: string; href: string; external?: boolean }[] = [
  { label: "Доставка й оплата", href: "/delivery" },
  { label: "Обмін і повернення", href: "/delivery#returns" },
  { label: "Таблиця розмірів", href: "/size-guide" },
  {
    label: "Статус замовлення: напишіть номер у Telegram",
    href: siteInfo.telegram.url,
    external: true,
  },
];

export const collab = {
  label: "Для співпраці, опту й блогерів",
  text: "Розглядаємо пропозиції щодо співпраці, оптових замовлень і бартеру з блогерами — напишіть нам на email або оберіть тему «Співпраця» у формі.",
};

export const legalDetails = {
  label: "Реквізити",
  legalName: siteInfo.legalName,
  edrpou: siteInfo.edrpou,
  address: siteInfo.address,
};
