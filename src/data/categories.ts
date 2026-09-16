import { Category } from "@/types/product";

const img = (file: string) => `/images/bamboli/${file}`;

/**
 * The three main catalog categories — docs/spec/marketing-structure.md §2.1.
 * Subcategories live in `src/data/categoryTree.ts`; this list only backs the
 * category roots (`/catalog/odyag` etc.), the footer's «Каталог» column and
 * product breadcrumbs.
 */
export const categories: Category[] = [
  {
    slug: "odyag",
    title: "Одяг",
    caption: "Сукні, костюми, верхній одяг і вишиванки — від 56 до 164 см.",
    image: img("products/DdTpZ6sgAxN_1.jpg"),
  },
  {
    slug: "igrashky",
    title: "Іграшки",
    caption: "Done by Deer, Jollein та інші — для гри, прикорму й сну.",
    image: img("land/Dc5XiPZDfmj_1.jpg"),
  },
  {
    slug: "aksesuary",
    title: "Аксесуари",
    caption: "Шапочки й пледи, які завершують образ.",
    image: img("products/DasGY3ZDCup_1.jpg"),
  },
];
