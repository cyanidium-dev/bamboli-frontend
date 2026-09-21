/**
 * Header navigation — mirrors the catalog structure in
 * docs/spec/marketing-structure.md §2 and §2.1.
 *
 * Categories are plain links; group, subcategory and brand tabs are built from
 * `src/data/categoryTree.ts` on the catalog pages themselves.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  /** Group heading — links to the group's own listing page. */
  title: string;
  href: string;
  links: NavLink[];
}

export interface NavMenu {
  label: string;
  href: string;
  /** «Усі товари» — first link to the category root; omitted where not wanted. */
  allLabel?: string;
  columns: NavColumn[];
}

/** No dropdown — group and subcategory tabs live on the catalog page itself. */
export const odyagMenu: NavMenu = {
  label: "Одяг",
  href: "/catalog/odyag",
  columns: [],
};

/** No dropdown — subcategory and brand tabs live on the catalog page itself. */
export const igrashkyMenu: NavMenu = {
  label: "Іграшки",
  href: "/catalog/igrashky",
  columns: [],
};

/** No dropdown — subcategory tabs live on the catalog page itself. */
export const aksesuaryMenu: NavMenu = {
  label: "Аксесуари",
  href: "/catalog/aksesuary",
  columns: [],
};

export const headerMegaMenus: NavMenu[] = [odyagMenu, igrashkyMenu, aksesuaryMenu];

export const headerSimpleLinks: NavLink[] = [
  { label: "SALE", href: "/catalog/sale" },
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
