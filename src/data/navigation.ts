import {
  accessorySubcategories,
  odyagGroups,
  toyBrands,
  toySubcategories,
} from "@/data/categoryTree";

/**
 * Header and footer catalog navigation — mirrors the catalog structure in
 * docs/spec/marketing-structure.md §2 and §2.1. Menus are built from
 * `src/data/categoryTree.ts` so they stay in step with catalog routing.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  title: string;
  /** Group's own listing page; omitted for plain headings such as «Бренди». */
  href?: string;
  links: NavLink[];
}

export interface NavMenu {
  label: string;
  href: string;
  /** «Усі товари» — first link to the category root; omitted where not wanted. */
  allLabel?: string;
  columns: NavColumn[];
}

/** Groups (Для всіх, Немовлята, …), each with its own subcategories. */
export const odyagMenu: NavMenu = {
  label: "Одяг",
  href: "/catalog/odyag",
  allLabel: "Усі товари",
  columns: odyagGroups.map((group) => ({
    title: group.title,
    href: `/catalog/odyag/${group.slug}`,
    links: group.subcategories.map((sub) => ({
      label: sub.title,
      href: `/catalog/odyag/${group.slug}/${sub.slug}`,
    })),
  })),
};

/** Subcategories as plain links, then brands under their own heading. */
export const igrashkyMenu: NavMenu = {
  label: "Іграшки",
  href: "/catalog/igrashky",
  allLabel: "Усі товари",
  columns: [
    ...toySubcategories.map((sub) => ({
      title: sub.title,
      href: `/catalog/igrashky/${sub.slug}`,
      links: [],
    })),
    {
      title: "Бренди",
      links: toyBrands.map((brand) => ({
        label: brand.name,
        href: `/catalog/igrashky/brend/${brand.slug}`,
      })),
    },
  ],
};

export const aksesuaryMenu: NavMenu = {
  label: "Аксесуари",
  href: "/catalog/aksesuary",
  allLabel: "Усі товари",
  columns: accessorySubcategories.map((sub) => ({
    title: sub.title,
    href: `/catalog/aksesuary/${sub.slug}`,
    links: [],
  })),
};

export const headerMegaMenus: NavMenu[] = [odyagMenu, igrashkyMenu, aksesuaryMenu];

export const saleLink: NavLink = { label: "SALE", href: "/catalog/sale" };

/** Service pages — folded under «Інформація» in the header. */
export const headerInfoLinks: NavLink[] = [
  { label: "Доставка та оплата", href: "/delivery" },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
  { label: "Блог", href: "/blog" },
];

/** Secondary pages — shown in the footer's «Інформація» column. */
export const footerInfoLinks: NavLink[] = [
  { label: "Про нас", href: "/about" },
  { label: "Доставка та оплата", href: "/delivery" },
  { label: "Обмін і повернення", href: "/delivery#returns" },
  { label: "Таблиця розмірів", href: "/size-guide" },
  { label: "Блог", href: "/blog" },
  { label: "Контакти", href: "/contacts" },
];
