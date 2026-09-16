/**
 * Header navigation — mirrors the catalog structure in
 * docs/spec/marketing-structure.md §2 and §2.1.
 *
 * Built from `src/data/categoryTree.ts`, the single source of truth also
 * used by the `/catalog/[category]/[[...slug]]` routes, so a subcategory
 * added there shows up in the header automatically.
 */

import {
  accessorySubcategories,
  odyagGroups,
  toyBrands,
  toySubcategories,
} from "@/data/categoryTree";

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
  /** «Усі товари» — always first, links to the category root. */
  allLabel: string;
  columns: NavColumn[];
}

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

export const igrashkyMenu: NavMenu = {
  label: "Іграшки",
  href: "/catalog/igrashky",
  allLabel: "Усі товари",
  columns: [
    {
      title: "Категорії",
      href: "/catalog/igrashky",
      links: toySubcategories.map((sub) => ({
        label: sub.title,
        href: `/catalog/igrashky/${sub.slug}`,
      })),
    },
    {
      title: "Бренд",
      href: "/catalog/igrashky",
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
  columns: [
    {
      title: "Категорії",
      href: "/catalog/aksesuary",
      links: accessorySubcategories.map((sub) => ({
        label: sub.title,
        href: `/catalog/aksesuary/${sub.slug}`,
      })),
    },
  ],
};

export const headerMegaMenus: NavMenu[] = [odyagMenu, igrashkyMenu, aksesuaryMenu];

export const headerSimpleLinks: NavLink[] = [
  { label: "SALE", href: "/catalog/sale" },
  { label: "Доставка та оплата", href: "/delivery" },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
  { label: "Блог", href: "/blog" },
];
