/**
 * Static content of the home page (not in Sanity by the brief).
 * Structure follows docs/spec/marketing-structure.md § 3.1.
 */

import type { HeroSlide } from "@/types/hero";

const site = (file: string) => `/images/bamboli/site/${file}`;
const photo = (file: string) => `/images/bamboli/products/${file}`;
const land = (file: string) => `/images/bamboli/land/${file}`;

export const heroSlides: HeroSlide[] = [
  {
    id: "basic-wardrobe",
    image: {
      src: site("lifestyle-street-boutique.jpg"),
      alt: "Дівчинка в куртці з вельветовим коміром і коричневому костюмі Bamboli на сходах бутіка",
    },
    eyebrow: "Власне виробництво · Львів",
    title: "Базовий дитячий одяг як у дорослих",
    cta: { label: "Дивитись каталог", href: "/catalog" },
    textPosition: "left",
  },
  {
    id: "new-collection",
    image: {
      src: land("Dc8IIn_DbnS_1.jpg"),
      alt: "Нова колекція дитячого одягу Bamboli",
    },
    eyebrow: "Нова колекція",
    title: "Тепло, м'яко й затишно",
    cta: { label: "До колекції", href: "/catalog/odyag/kolektsiyi/nova-kolektsiya" },
    textPosition: "right",
  },
  {
    id: "vyshyvanky",
    image: {
      // TODO: замінити на окремі банери з Sanity.
      src: photo("Db8XNlgDKsj_1.jpg"),
      alt: "Вишита жилетка з велюру Bamboli",
    },
    eyebrow: "Натуральні тканини",
    title: "Вишиванки для найменших",
    cta: { label: "Вишиванки", href: "/catalog/odyag/vyshyvanky" },
    textPosition: "left",
  },
];

export const promo = {
  cta: { href: "/catalog/odyag/kolektsiyi/nova-kolektsiya" },
  image: {
    // TODO: замінити на зображення з Sanity, коли банер переїде в CMS.
    src: site("nova-kolektsiya-banner.png"),
    alt: "Нова колекція: тепло, м'яко й затишно",
    width: 2370,
    height: 708,
  },
  imageMobile: {
    // TODO: замінити на зображення з Sanity, коли банер переїде в CMS.
    src: site("nova-kolektsiya-banner-mobile.png"),
    alt: "Нова колекція: тепло, м'яко й затишно",
    width: 2240,
    height: 1416,
  },
};

export const vyshyvanka = {
  label: "Вишиванки власного пошиття",
  title: "Традиції, до яких хочеться повертатися",
  quote:
    "Є речі, які залишаються у пам'яті назавжди. Перша вишиванка. Перші родинні світлини. Перші свята, які згодом стануть найтеплішими спогадами.",
  text: "У сучасному крої, натуральній тканині та з любов'ю до кожної деталі. Кожен стібок — з любов'ю до вас.",
  cta: { label: "Усі вишиванки", href: "/catalog/odyag/vyshyvanky" },
  image: {
    src: site("brand-emotion-vyshyvanka.jpg"),
    alt: "Усміхнена дівчинка у білій вишиванці з червоно-синьою вишивкою на тлі зелені",
  },
};

export const babyCollection = {
  label: "Для малюків 0–2",
  title: "М'які натуральні тканини для найменших",
  href: "/catalog/odyag/malyuky",
};

/**
 * Home page «Категорії-плитки» — docs/spec/marketing-structure.md §3.1
 * block 3. Four audience/type entry points shown as a grid (2×2 on mobile,
 * one row on desktop).
 */
export interface CategoryTile {
  slug: string;
  title: string;
  caption: string;
  image: string;
  href: string;
}

export const categoryTiles: CategoryTile[] = [
  {
    slug: "malyuky",
    title: "Немовлята",
    caption: "М'які натуральні тканини для найменших.",
    image: photo("DcyHUZyAG5o_1.jpg"),
    href: "/catalog/odyag/malyuky",
  },
  {
    slug: "divchatka",
    title: "Дівчата",
    caption: "Сукні, костюми й верхній одяг для дівчаток.",
    image: photo("DbQlNzOjF-w_1.jpg"),
    href: "/catalog/odyag/divchatka",
  },
  {
    slug: "khlopchyky",
    title: "Хлопчики",
    caption: "Комбінезони, костюми й верхній одяг для хлопчиків.",
    image: photo("Da-rqUojCCP_1.jpg"),
    href: "/catalog/odyag/khlopchyky",
  },
  {
    slug: "igrashky",
    title: "Іграшки",
    caption: "Done by Deer, Jollein та інші — для гри, прикорму й сну.",
    image: land("Dc-966pt_PG_1.jpg"),
    href: "/catalog/igrashky",
  },
];

export const toysCollection = {
  label: "Іграшки, посуд і сон",
  title: "Для гри, прикорму, сну й подарунка",
  text: "Преміальні бренди Done by Deer, Jollein та інші — у тому ж кошику, що й одяг. Безпечні матеріали, спокійні кольори.",
  href: "/catalog/igrashky",
  image: {
    src: land("Dc-966pt_PG_1.jpg"),
    alt: "Два м'які ведмедики в дитячому ліжечку на картатому пледі",
  },
  caption: "Що подарувати на виписку?",
};

export type BenefitIcon =
  | "needle"
  | "leaf"
  | "ruler"
  | "store"
  | "card"
  | "gift";

export const benefits: { icon: BenefitIcon; title: string; text: string }[] = [
  {
    icon: "needle",
    title: "Власне виробництво",
    text: "Ми не перепродаємо, а шиємо самі у Львові. Тому якість витримує не одну дитину, а ціна чесна.",
  },
  {
    icon: "leaf",
    title: "Натуральні тканини",
    text: "Льон, муслін, велюр, double face і вельвет. Склад указуємо в кожній картці товару.",
  },
  {
    icon: "ruler",
    title: "Розміри 56–164 см",
    text: "Від новонароджених до підлітків. Таблиця «зріст → розмір» і допомога з вибором.",
  },
  {
    icon: "store",
    title: "Шоурум на Театральній, 12",
    text: "Приходьте приміряти одяг і подивитися іграшки наживо. 53 тисячі родин уже з нами в Instagram.",
  },
  {
    icon: "card",
    title: "Замовлення за хвилину",
    text: "Без переписки в Direct: кошик, Нова Пошта, MonoPay, LiqPay або оплата при отриманні.",
  },
  {
    icon: "gift",
    title: "Одяг та іграшки разом",
    text: "Вишиванка, плед і ведмедик в одному замовленні — готовий подарунок на виписку чи день народження.",
  },
];

export const newCollection = {
  label: "Новинки",
  title: "Наша нова колекція",
  href: "/catalog/new",
};

export const saleCollection = {
  label: "Знижки",
  title: "Встигніть за вигідною ціною",
  href: "/catalog/sale",
};

export interface Reel {
  id: string;
  poster: string;
  caption: string;
  /** Muted mp4 in /public — plays while the tile is visible. */
  video?: string;
}

export const reels: Reel[] = [
  {
    id: "autumn",
    poster: site("autumn-collection-teaser.jpg"),
    caption: "Тизер осінньої колекції",
  },
  {
    id: "vyshyvanka",
    poster: site("brand-emotion-vyshyvanka.jpg"),
    caption: "Перша вишиванка",
  },
  {
    id: "store",
    poster: site("store-interior-1.jpg"),
    caption: "Запрошуємо в шоурум",
  },
  {
    id: "Db-hXnSM1K6",
    poster: photo("Db-hXnSM1K6_frame.jpg"),
    caption: "Сукня з яворівською вишивкою",
  },
  {
    id: "DcD9LV_Mjs8",
    poster: photo("DcD9LV_Mjs8_frame.jpg"),
    caption: "Вишиванка для хлопчика",
  },
  {
    id: "DdOY5H9AFNP",
    poster: photo("DdOY5H9AFNP_frame.jpg"),
    caption: "Комбінезон на замочок",
  },
];

export interface Review {
  id: string;
  name: string;
  meta: string;
  text: string;
  product: string;
}

/**
 * TODO: placeholder reviews — replace with real ones from the «Рекомендації»
 * and «Дітки» highlights, or set `enabled: false` to hide the block.
 */
export const reviews: { enabled: boolean; items: Review[] } = {
  enabled: true,
  items: [
    {
      id: "r1",
      name: "Олена",
      meta: "Київ · син 8 місяців",
      text: "Ромпер з вушками — наша любов. Тканина м'якенька, заклепки не тиснуть, після десятка прань виглядає як новий. Взяли вже другий колір.",
      product: "Ромпер з вушками",
    },
    {
      id: "r2",
      name: "Мар'яна",
      meta: "Львів · донька 5 років",
      text: "Приміряли вишиту сукню в шоурумі на Театральній. Вишивка акуратна, льон приємний до тіла. На родинному фото донька була найщасливіша.",
      product: "Вишита сукня з квітами",
    },
    {
      id: "r3",
      name: "Ірина",
      meta: "Одеса · донька 3 роки",
      text: "Сумнівалася з розміром, написала — порадили взяти більший, і вгадали: лляний костюм сів ідеально й ще на наступне літо лишився запас.",
      product: "Лляний костюм",
    },
    {
      id: "r4",
      name: "Андрій",
      meta: "Дніпро · син 6 років",
      text: "Замовляли вишиванку для першого дзвоника. Прийшла за два дні, упакована дуже охайно. Сорочка щільна, шви рівні — видно, що шиють для себе.",
      product: "Вишита сорочка для хлопчика",
    },
    {
      id: "r5",
      name: "Софія",
      meta: "Тернопіль · подарунок на виписку",
      text: "Збирала подарунок подрузі: плед, ведмедик Jollein і пісочник. Усе в одному замовленні, стильно й без пошуків по різних магазинах.",
      product: "Ведмедик Jollein Teddy Bear",
    },
    {
      id: "r6",
      name: "Наталія",
      meta: "Івано-Франківськ · донька 7 років",
      text: "Куртка з вельветовим коміром — як у мене, тільки маленька. Донька носить і з костюмом, і з сукнею. Тепла, але не громіздка.",
      product: "Куртка з коміром",
    },
    {
      id: "r7",
      name: "Катерина",
      meta: "Вінниця · син 1 рік",
      text: "Мусліновий комплект у полоску брали на спекотне літо — дихає, не липне, після прання не сідає. І ціна зі знижкою дуже приємна.",
      product: "Боді + пісочник у полоску",
    },
  ],
};
