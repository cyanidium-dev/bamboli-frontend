import {
  AccessorySubcategorySlug,
  Audience,
  ClothingSubcategorySlug,
  Collection,
  ToySubcategorySlug,
} from "@/types/product";

/**
 * Single source of truth for the catalog tree — docs/spec/marketing-structure.md
 * §2.1. Drives the header mega-menu (`src/data/navigation.ts`), catalog
 * routing (`src/app/catalog/[category]/[[...slug]]/page.tsx`) and the
 * product-filtering helpers in `src/lib/api.ts`.
 */

export interface SubcategoryDef<Slug extends string = string> {
  slug: Slug;
  title: string;
}

export interface OdyagGroupDef {
  slug: string;
  title: string;
  caption: string;
  /** How this group filters products — see §2.1 "Як це влаштовано в даних". */
  filterKind: "all" | "audience" | "collection" | "vyshyvanky";
  /** Set only for filterKind "audience"/"vyshyvanky". */
  audience?: Audience;
  subcategories: SubcategoryDef<ClothingSubcategorySlug | Collection | Audience>[];
}

export const odyagGroups: OdyagGroupDef[] = [
  {
    slug: "dlya-vsih",
    title: "Для всіх",
    caption: "Усі моделі підкатегорії — без фільтра за статтю.",
    filterKind: "all",
    subcategories: [
      { slug: "sukni", title: "Сукні" },
      { slug: "spidnytsi", title: "Спідниці" },
      { slug: "kombinezony", title: "Комбінезони" },
      { slug: "sorochky", title: "Сорочки" },
      { slug: "shtany", title: "Штани" },
      { slug: "shorty", title: "Шорти" },
      { slug: "kostyumy", title: "Костюми" },
      { slug: "verkhniy-odyag", title: "Верхній одяг" },
      { slug: "bodi", title: "Боді" },
      { slug: "cholovichky", title: "Чоловічки" },
      { slug: "komplekty", title: "Комплекти" },
    ],
  },
  {
    slug: "divchatka",
    title: "Дівчата",
    caption: "Сукні, костюми й верхній одяг для дівчаток.",
    filterKind: "audience",
    audience: "divchatka",
    subcategories: [
      { slug: "sukni", title: "Сукні" },
      { slug: "spidnytsi", title: "Спідниці" },
      { slug: "kombinezony", title: "Комбінезони" },
      { slug: "sorochky", title: "Сорочки" },
      { slug: "shtany", title: "Штани" },
      { slug: "kostyumy", title: "Костюми" },
      { slug: "verkhniy-odyag", title: "Верхній одяг" },
    ],
  },
  {
    slug: "khlopchyky",
    title: "Хлопчики",
    caption: "Комбінезони, костюми й верхній одяг для хлопчиків.",
    filterKind: "audience",
    audience: "khlopchyky",
    subcategories: [
      { slug: "kombinezony", title: "Комбінезони" },
      { slug: "sorochky", title: "Сорочки" },
      { slug: "shtany", title: "Штани" },
      { slug: "shorty", title: "Шорти" },
      { slug: "kostyumy", title: "Костюми" },
      { slug: "verkhniy-odyag", title: "Верхній одяг" },
    ],
  },
  {
    slug: "malyuky",
    title: "Немовлята",
    caption: "М'які натуральні тканини від 56 см.",
    filterKind: "audience",
    audience: "malyuky",
    subcategories: [
      { slug: "bodi", title: "Боді" },
      { slug: "cholovichky", title: "Чоловічки" },
      { slug: "komplekty", title: "Комплекти" },
      { slug: "kombinezony", title: "Комбінезони" },
      { slug: "odyag", title: "Одяг" },
    ],
  },
  {
    slug: "kolektsiyi",
    title: "Колекції",
    caption: "Сезонні капсули й наскрізні матеріали.",
    filterKind: "collection",
    subcategories: [
      { slug: "llon", title: "Льон" },
      { slug: "nova-kolektsiya", title: "Нова колекція" },
      { slug: "sezonni-kolektsiyi", title: "Сезонні колекції" },
    ],
  },
  {
    slug: "vyshyvanky",
    title: "Вишиванки",
    caption: "Власного пошиття, з яворівською вишивкою.",
    filterKind: "vyshyvanky",
    subcategories: [
      { slug: "divchatka", title: "Дівчата" },
      { slug: "khlopchyky", title: "Хлопчики" },
      { slug: "malyuky", title: "Немовлята" },
    ],
  },
];

export const toySubcategories: SubcategoryDef<ToySubcategorySlug>[] = [
  { slug: "posud", title: "Посуд" },
  { slug: "gryzuntsi", title: "Гризунці" },
  { slug: "rozvyvayuchi-igrashky", title: "Розвиваючі іграшки" },
  { slug: "myaki-igrashky", title: "М'які іграшки" },
];

export interface BrandDef {
  slug: string;
  name: string;
}

export const toyBrands: BrandDef[] = [
  { slug: "done-by-deer", name: "Done by Deer" },
  { slug: "jollein", name: "Jollein" },
];

export const accessorySubcategories: SubcategoryDef<AccessorySubcategorySlug>[] = [
  { slug: "shapochky-ta-povyazky", title: "Шапочки та пов'язки" },
  { slug: "pledy-ta-konverty", title: "Пледи та конверти" },
  { slug: "tekstyl-dlya-snu", title: "Текстиль для сну" },
  { slug: "shkarpetky-ta-kolgotky", title: "Шкарпетки та колготки" },
  { slug: "ryukzaky-ta-sumky", title: "Рюкзаки та сумки" },
  { slug: "slyunyavchyky-ta-nagrudnyky", title: "Слюнявчики та нагрудники" },
  { slug: "dribnytsi", title: "Дрібниці" },
];

export function findOdyagGroup(slug: string) {
  return odyagGroups.find((group) => group.slug === slug);
}
