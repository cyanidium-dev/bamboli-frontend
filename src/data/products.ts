import {
  Audience,
  Badge,
  Collection,
  MainCategorySlug,
  Product,
  ProductKind,
  SizeOption,
  Subcategory,
} from "@/types/product";

/**
 * Demo catalogue built from the @bamboli.ua / @bamboli.land Instagram export
 * (docs/spec/instagram-content-export.md). Prices are as posted — verify
 * against the current price list before launch. Will be replaced by Sanity.
 *
 * category/subcategory/audience/collections follow the tree in
 * docs/spec/marketing-structure.md §2.1 (see src/data/categoryTree.ts).
 */

type SizeSeed = [label: string, price: number, oldPrice?: number];

interface Seed {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: MainCategorySlug;
  subcategory: Subcategory;
  kind?: ProductKind;
  badges?: Badge[];
  /** Empty/omitted = unisex — shows only under «Для всіх». */
  audience?: Audience[];
  collections?: Collection[];
  brand?: string;
  /** Used when a product has no size groups (toys, accessories). */
  price?: number;
  oldPrice?: number;
  sizes?: SizeSeed[];
  image: string;
  colors?: { id: string; name: string; hex: string }[];
  description: string;
  details: { label: string; value: string }[];
}

const photo = (file: string) => `/images/bamboli/products/${file}`;
const landPhoto = (file: string) => `/images/bamboli/land/${file}`;

const OWN_PRODUCTION = { label: "Виробництво", value: "Власне, Львів" };

function build(seed: Seed): Product {
  const sizes: SizeOption[] = (seed.sizes ?? []).map(
    ([label, price, oldPrice]) => ({ label, inStock: true, price, oldPrice }),
  );
  const cheapest = sizes.reduce<SizeOption | undefined>(
    (min, size) => (!min || size.price! < min.price! ? size : min),
    undefined,
  );

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    subtitle: seed.subtitle,
    category: seed.category,
    subcategory: seed.subcategory,
    kind: seed.kind ?? "apparel",
    price: cheapest?.price ?? seed.price ?? 0,
    oldPrice: cheapest?.oldPrice ?? seed.oldPrice,
    badges: seed.badges ?? [],
    audience: seed.audience,
    collections: seed.collections,
    brand: seed.brand,
    description: seed.description,
    details: seed.details,
    colors: (seed.colors ?? [{ id: "c-main", name: "Як на фото", hex: "#E8DFD2" }]).map(
      (color) => ({ ...color, images: [seed.image], sizes }),
    ),
  };
}

const seeds: Seed[] = [
  /* ——— Для малюків (Одяг → Малюки) ——— */
  {
    id: "b-001",
    slug: "romper-z-vushkamy",
    title: "Ромпер з вушками",
    subtitle: "трикотаж · на заклепках",
    category: "odyag",
    subcategory: "bodi",
    audience: ["malyuky"],
    badges: ["top"],
    sizes: [
      ["56–62", 880],
      ["68–74", 980],
      ["80–86", 1080],
    ],
    image: photo("DcyHUZyAG5o_1.jpg"),
    colors: [
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
      { id: "c-beige", name: "Беж", hex: "#D8C3A5" },
      { id: "c-mocha", name: "Мокко", hex: "#8B6B55" },
      { id: "c-grey", name: "Сірий", hex: "#B7B3AC" },
    ],
    description:
      "Наш бестселер: м'який ромпер із вушками на капюшоні та заклепками по всій довжині — легко вдягати навіть сонного малюка. Є в 9 кольорах.",
    details: [
      { label: "Застібка", value: "Заклепки" },
      { label: "Кольори", value: "9 відтінків" },
      OWN_PRODUCTION,
    ],
  },
  {
    id: "b-002",
    slug: "romper-double-face",
    title: "Ромпер double face",
    subtitle: "трикотаж double face · сірий",
    category: "odyag",
    subcategory: "bodi",
    audience: ["malyuky"],
    badges: ["new"],
    sizes: [
      ["56–68", 950],
      ["74–86", 1150],
    ],
    image: photo("DdBq1thADEF_1.jpg"),
    colors: [{ id: "c-grey", name: "Сірий", hex: "#A9A6A1" }],
    description:
      "Щільний двошаровий трикотаж тримає форму й тепло — ромпер для прохолодних осінніх днів.",
    details: [{ label: "Тканина", value: "Трикотаж double face" }, OWN_PRODUCTION],
  },
  {
    id: "b-003",
    slug: "kombinezon-na-zamochok",
    title: "Комбінезон на замочок",
    subtitle: "верхній шар · молочний, беж",
    category: "odyag",
    subcategory: "kombinezony",
    audience: ["malyuky"],
    badges: ["new"],
    sizes: [
      ["56–68", 1750],
      ["74–86", 1950],
    ],
    image: photo("DdOY5H9AFNP_frame.jpg"),
    colors: [
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
      { id: "c-beige", name: "Беж", hex: "#D8C3A5" },
    ],
    description:
      "Комбінезон на блискавці як верхній шар для прогулянок: швидко вдягається й зручно поєднується з ромпером.",
    details: [{ label: "Застібка", value: "Блискавка" }, OWN_PRODUCTION],
  },
  {
    id: "b-004",
    slug: "romper-u-rubchyk",
    title: "Ромпер у рубчик",
    subtitle: "рубчик · на ґудзичках",
    category: "odyag",
    subcategory: "bodi",
    audience: ["malyuky"],
    sizes: [
      ["56–68", 580],
      ["74–86", 680],
    ],
    image: photo("DctTwuVAL0__1.jpg"),
    description:
      "Базовий ромпер у м'який рубчик на ґудзичках — на кожен день і під плед.",
    details: [{ label: "Тканина", value: "Трикотаж у рубчик" }, OWN_PRODUCTION],
  },
  {
    id: "b-005",
    slug: "bodi-pisochnyk-muslin",
    title: "Боді + пісочник у полоску",
    subtitle: "муслін · комплект",
    category: "odyag",
    subcategory: "komplekty",
    audience: ["malyuky"],
    badges: ["sale"],
    sizes: [
      ["56–68", 1280, 1600],
      ["74–86", 1280, 1600],
    ],
    image: photo("DbiFxSIjK2v_1.jpg"),
    description:
      "Легкий мусліновий комплект у полоску: боді й пісочник, які дихають навіть у спеку.",
    details: [{ label: "Тканина", value: "Муслін" }, OWN_PRODUCTION],
  },
  {
    id: "b-006",
    slug: "lyanyi-pisochnyk",
    title: "Лляний пісочник у полоску",
    subtitle: "льон",
    category: "odyag",
    subcategory: "odyag",
    audience: ["malyuky"],
    collections: ["llon"],
    badges: ["sale"],
    sizes: [
      ["56–68", 675, 750],
      ["74–86", 765, 850],
    ],
    image: photo("DbJBQU6srKj_frame.jpg"),
    description: "Лляний пісочник у тонку полоску — прохолодний і приємний до шкіри.",
    details: [{ label: "Тканина", value: "Льон" }, OWN_PRODUCTION],
  },
  {
    id: "b-007",
    slug: "vyshytyi-pisochnyk",
    title: "Вишитий пісочник",
    subtitle: "білий, коричневий",
    category: "odyag",
    subcategory: "odyag",
    audience: ["malyuky"],
    collections: ["vyshyvanky"],
    sizes: [
      ["56–68", 1750],
      ["74–86", 1950],
    ],
    image: photo("DaaJHaejOA3_1.jpg"),
    colors: [
      { id: "c-white", name: "Білий", hex: "#F6F3EE" },
      { id: "c-brown", name: "Коричневий", hex: "#7A5A45" },
    ],
    description:
      "Перша вишиванка для найменших: пісочник із вишивкою, до якого пасує вишитий плед.",
    details: [{ label: "Оздоблення", value: "Вишивка" }, OWN_PRODUCTION],
  },

  /* ——— Костюми (Одяг → Для всіх / Дівчатка / Хлопчики) ——— */
  {
    id: "b-010",
    slug: "lyanyi-kostyum",
    title: "Лляний костюм",
    subtitle: "льон · 4 кольори",
    category: "odyag",
    subcategory: "kostyumy",
    collections: ["llon"],
    badges: ["top"],
    sizes: [
      ["80–104", 2350],
      ["110–134", 2650],
    ],
    image: photo("Dau5VCljHF6_1.jpg"),
    colors: [
      { id: "c-ivory", name: "Айворі", hex: "#F3EDE1" },
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
      { id: "c-blue", name: "Блакитний", hex: "#BCCBD8" },
      { id: "c-pink", name: "Пудрово-рожевий", hex: "#E5C9C3" },
    ],
    description:
      "Топ продажів сезону: лляний костюм вільного крою, у якому дитині легко й гарно — і на прогулянку, і на свято.",
    details: [{ label: "Тканина", value: "Льон" }, OWN_PRODUCTION],
  },
  {
    id: "b-011",
    slug: "kostyumchyk-v-klitynku",
    title: "Костюмчик у клітинку",
    subtitle: "комплект · хіт",
    category: "odyag",
    subcategory: "kostyumy",
    badges: ["top", "sale"],
    sizes: [
      ["80–92", 1488, 1860],
      ["110–116", 1648, 2060],
    ],
    image: photo("DbLMqjDDOpx_1.jpg"),
    description: "Костюмчик у клітинку, який повторювали на прохання мам.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-012",
    slug: "sportyvnyi-kostyum-polar",
    title: "Спортивний костюм полар фліс",
    subtitle: "полар фліс · молочний, чорний",
    category: "odyag",
    subcategory: "kostyumy",
    badges: ["new"],
    sizes: [
      ["80–104", 2080],
      ["110–134", 2280],
    ],
    image: photo("Dc3mdRMgKVa_1.jpg"),
    colors: [
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
      { id: "c-black", name: "Чорний", hex: "#2A2826" },
    ],
    description: "Теплий флісовий костюм на осінь — м'який, легкий і не сковує рухів.",
    details: [{ label: "Тканина", value: "Полар фліс" }, OWN_PRODUCTION],
  },
  {
    id: "b-013",
    slug: "kostyum-muslinovyi",
    title: "Мусліновий костюм",
    subtitle: "муслін · довгий рукав",
    category: "odyag",
    subcategory: "kostyumy",
    badges: ["sale"],
    sizes: [
      ["80–104", 826, 1180],
      ["110–134", 966, 1380],
    ],
    image: photo("DbVVrvsjFDv_1.jpg"),
    description: "Легкий мусліновий костюм з довгим рукавом для теплих днів.",
    details: [{ label: "Тканина", value: "Муслін" }, OWN_PRODUCTION],
  },
  {
    id: "b-014",
    slug: "sorochka-shorty",
    title: "Сорочка + шорти",
    subtitle: "комплект",
    category: "odyag",
    subcategory: "komplekty",
    audience: ["khlopchyky"],
    badges: ["sale"],
    sizes: [
      ["86–104", 2032, 2540],
      ["116–146", 2032, 2540],
    ],
    image: photo("DbGVpStDJHT_1.jpg"),
    description: "Сорочка й шорти — стриманий комплект у дорослому стилі.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-015",
    slug: "lyanyi-kostyum-z-bluzoyu",
    title: "Лляний костюм з блузою",
    subtitle: "льон · блакитний",
    category: "odyag",
    subcategory: "kostyumy",
    audience: ["divchatka"],
    collections: ["llon"],
    badges: ["sale"],
    sizes: [
      ["92–104", 1660, 2260],
      ["110–134", 1960, 2260],
    ],
    image: photo("DbDleIFjJTR_1.jpg"),
    colors: [{ id: "c-blue", name: "Блакитний", hex: "#BCCBD8" }],
    description: "Блуза на зав'язках і штани з льону у ніжному блакитному.",
    details: [{ label: "Тканина", value: "Льон" }, OWN_PRODUCTION],
  },
  {
    id: "b-016",
    slug: "kostyum-bluza-z-ryusheyu",
    title: "Костюм: блуза з рюшею + палаццо",
    subtitle: "у клітинку",
    category: "odyag",
    subcategory: "kostyumy",
    audience: ["divchatka"],
    sizes: [
      ["80–104", 1860],
      ["110–134", 2060],
    ],
    image: photo("DaSzYEZDPcT_1.jpg"),
    description: "Блуза з рюшею та широкі палаццо у клітинку.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-037",
    slug: "sorochka-v-klitynku",
    title: "Сорочка в клітинку",
    subtitle: "для хлопчиків",
    category: "odyag",
    subcategory: "sorochky",
    audience: ["khlopchyky"],
    sizes: [
      ["80–104", 1480],
      ["110–134", 1680],
    ],
    image: photo("Da-rqUojCCP_1.jpg"),
    description: "Сорочка в клітинку — базова річ у гардеробі хлопчика.",
    details: [OWN_PRODUCTION],
  },

  /* ——— Верхній одяг (Одяг → Для всіх) ——— */
  {
    id: "b-020",
    slug: "kurtka-z-komirom",
    title: "Куртка з коміром",
    subtitle: "вельветовий комір · коричневий, беж",
    category: "odyag",
    subcategory: "verkhniy-odyag",
    badges: ["top", "new"],
    sizes: [
      ["80–104", 2380],
      ["110–134", 2680],
    ],
    image: photo("DdTpZ6sgAxN_1.jpg"),
    colors: [
      { id: "c-beige", name: "Беж", hex: "#B9A48F" },
      { id: "c-brown", name: "Коричневий", hex: "#6E5140" },
    ],
    description:
      "Хіт минулого сезону, який ми повторили через попит. Виглядає вдало і зі спортивним костюмом, і в класичному образі.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-021",
    slug: "trench",
    title: "Тренч",
    subtitle: "беж, шоколад, коричневий",
    category: "odyag",
    subcategory: "verkhniy-odyag",
    badges: ["new"],
    sizes: [
      ["80–104", 2190],
      ["110–134", 2390],
    ],
    image: photo("Dc_H2t7AAcg_1.jpg"),
    colors: [
      { id: "c-beige", name: "Беж", hex: "#CDB89C" },
      { id: "c-choco", name: "Шоколад", hex: "#4E3A2F" },
      { id: "c-brown", name: "Коричневий", hex: "#7A5A45" },
    ],
    description: "Стильний тренч для осінніх прогулянок — як у мами, тільки менший.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-022",
    slug: "bomber",
    title: "Бомбер",
    subtitle: "осінній образ",
    category: "odyag",
    subcategory: "verkhniy-odyag",
    sizes: [
      ["80–104", 1850],
      ["110–134", 2050],
    ],
    image: photo("Dc6HRO8AI2x_1.jpg"),
    description: "Бомбер, який легко поєднати з костюмом олімпійка + палаццо.",
    details: [OWN_PRODUCTION],
  },

  /* ——— Вишиванки (Одяг → Вишиванки) ——— */
  {
    id: "b-030",
    slug: "vyshyta-suknya-kvity",
    title: "Вишита сукня з квітами",
    subtitle: "червоно-блакитна вишивка",
    category: "odyag",
    subcategory: "sukni",
    audience: ["divchatka"],
    collections: ["vyshyvanky"],
    badges: ["top"],
    sizes: [
      ["80–104", 2950],
      ["110–134", 3250],
      ["140–164", 3550],
    ],
    image: photo("DbvJ1YpjGv7_1.jpg"),
    description:
      "Сукня з червоно-блакитною квітковою вишивкою — одна з наймиліших моделей колекції.",
    details: [{ label: "Оздоблення", value: "Вишивка" }, OWN_PRODUCTION],
  },
  {
    id: "b-031",
    slug: "suknya-yavorivska-vyshyvka",
    title: "Сукня з яворівською вишивкою",
    subtitle: "яворівська вишивка",
    category: "odyag",
    subcategory: "sukni",
    audience: ["divchatka"],
    collections: ["vyshyvanky"],
    sizes: [
      ["80–104", 2950],
      ["110–134", 3150],
      ["140–164", 3450],
    ],
    image: photo("Db-hXnSM1K6_frame.jpg"),
    description: "Традиційна яворівська вишивка в сучасному крої.",
    details: [{ label: "Оздоблення", value: "Яворівська вишивка" }, OWN_PRODUCTION],
  },
  {
    id: "b-032",
    slug: "zhyletka-z-velyuru",
    title: "Вишита жилетка з велюру",
    subtitle: "велюр · шоколад, молочний",
    category: "odyag",
    subcategory: "verkhniy-odyag",
    audience: ["divchatka"],
    collections: ["vyshyvanky"],
    badges: ["top"],
    sizes: [
      ["80–116", 2580],
      ["122–164", 2980],
    ],
    image: photo("Db8XNlgDKsj_1.jpg"),
    colors: [
      { id: "c-choco", name: "Шоколад", hex: "#4E3A2F" },
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
    ],
    description:
      "Вишита жилетка з велюру, яку можна поєднати із сукнею, спідницею чи блузою.",
    details: [{ label: "Тканина", value: "Велюр" }, OWN_PRODUCTION],
  },
  {
    id: "b-033",
    slug: "vyshyta-sorochka-dlya-divchynky",
    title: "Вишита сорочка для дівчинки",
    subtitle: "5 моделей у серії",
    category: "odyag",
    subcategory: "sorochky",
    audience: ["divchatka"],
    collections: ["vyshyvanky"],
    sizes: [
      ["80–104", 2190],
      ["110–134", 2390],
      ["140–146", 2590],
    ],
    image: photo("Db5rPYtjBZ9_1.jpg"),
    description:
      "Серія вишитих сорочок: синьо-червона нитка, квіти, хакі-блакитний, з комірцем і з прямим рукавчиком.",
    details: [{ label: "Оздоблення", value: "Вишивка" }, OWN_PRODUCTION],
  },
  {
    id: "b-034",
    slug: "keip-vyshyvanka",
    title: "Кейп-вишиванка",
    subtitle: "поверх сукні, блузи чи пальта",
    category: "odyag",
    subcategory: "verkhniy-odyag",
    audience: ["divchatka"],
    collections: ["vyshyvanky"],
    sizes: [
      ["80–116", 3350],
      ["122–164", 3750],
    ],
    image: photo("Db3A8Z4MtfS_frame.jpg"),
    description: "Вишитий кейп, який носиться поверх сукні, блузи чи пальта.",
    details: [{ label: "Оздоблення", value: "Вишивка" }, OWN_PRODUCTION],
  },
  {
    id: "b-035",
    slug: "vyshyta-sorochka-dlya-khlopchyka",
    title: "Вишита сорочка для хлопчика",
    subtitle: "хакі, блакитна, червона",
    category: "odyag",
    subcategory: "sorochky",
    audience: ["khlopchyky"],
    collections: ["vyshyvanky"],
    sizes: [
      ["80–104", 2150],
      ["110–134", 2350],
      ["140–164", 2550],
    ],
    image: photo("DbnmicQDEPN_1.jpg"),
    colors: [
      { id: "c-khaki", name: "Хакі", hex: "#8A8B6C" },
      { id: "c-blue", name: "Блакитна", hex: "#BCCBD8" },
      { id: "c-red", name: "Червона", hex: "#A8483E" },
    ],
    description: "Чотири моделі вишитих сорочок для хлопчиків — від 80 до 164 см.",
    details: [{ label: "Оздоблення", value: "Вишивка" }, OWN_PRODUCTION],
  },
  {
    id: "b-036",
    slug: "vyshyta-sorochka-velvetovi-shtany",
    title: "Вишита сорочка + вельветові штани",
    subtitle: "комплект для хлопчика",
    category: "odyag",
    subcategory: "komplekty",
    audience: ["khlopchyky"],
    collections: ["vyshyvanky"],
    badges: ["new"],
    sizes: [
      ["80–104", 2450],
      ["110–134", 2650],
      ["140–164", 2850],
    ],
    image: photo("DcD9LV_Mjs8_frame.jpg"),
    description: "Вишита сорочка, до якої ми пошили вельветові штани.",
    details: [{ label: "Тканина штанів", value: "Вельвет" }, OWN_PRODUCTION],
  },

  /* ——— Сукні (Одяг → Дівчатка) ——— */
  {
    id: "b-040",
    slug: "suknya-v-klitynku-z-komirtsem",
    title: "Сукня в клітинку з комірцем",
    subtitle: "комірець",
    category: "odyag",
    subcategory: "sukni",
    audience: ["divchatka"],
    badges: ["top"],
    sizes: [
      ["80–104", 2630],
      ["110–134", 2930],
    ],
    image: photo("DbQlNzOjF-w_1.jpg"),
    description: "Сукня в клітинку з акуратним комірцем. Деталь, яка змінює весь образ.",
    details: [OWN_PRODUCTION],
  },
  {
    id: "b-041",
    slug: "suknya-aivori",
    title: "Сукня айворі",
    subtitle: "айворі, рожева",
    category: "odyag",
    subcategory: "sukni",
    audience: ["divchatka"],
    sizes: [
      ["80–104", 1650],
      ["110–134", 1850],
    ],
    image: photo("DbfbitKDNnK_1.jpg"),
    colors: [
      { id: "c-ivory", name: "Айворі", hex: "#F3EDE1" },
      { id: "c-pink", name: "Рожева", hex: "#E5C9C3" },
    ],
    description: "Ніжна сукня на щодень і на свято.",
    details: [OWN_PRODUCTION],
  },

  /* ——— Аксесуари ——— */
  {
    id: "b-050",
    slug: "pled-z-muslinu",
    title: "Плед із мусліну",
    subtitle: "муслін · беж, молочний",
    category: "aksesuary",
    subcategory: "pledy-ta-konverty",
    kind: "toy",
    price: 1550,
    image: photo("DasGY3ZDCup_1.jpg"),
    colors: [
      { id: "c-beige", name: "Беж", hex: "#D8C3A5" },
      { id: "c-milk", name: "Молочний", hex: "#EFE7DA" },
    ],
    description: "Легкий мусліновий плед для коляски, сну й фотосесій.",
    details: [{ label: "Тканина", value: "Муслін" }, OWN_PRODUCTION],
  },
  {
    id: "l-002",
    slug: "spalnyi-mishok-jollein-velvet",
    title: "Спальний мішок Jollein Velvet",
    subtitle: "велюр · нуга · 90 см",
    category: "aksesuary",
    subcategory: "tekstyl-dlya-snu",
    kind: "toy",
    brand: "Jollein",
    price: 2219,
    image: landPhoto("DdPUYZ7kQEM_1.jpg"),
    description: "Велюровий спальник зі знімними рукавами, який не сповзає під час сну.",
    details: [
      { label: "Бренд", value: "Jollein" },
      { label: "Розмір", value: "90 см" },
    ],
  },
  {
    id: "l-003",
    slug: "spalnyi-mishok-jollein-rib",
    title: "Спальний мішок Jollein Rib",
    subtitle: "рубчик · айворі",
    category: "aksesuary",
    subcategory: "tekstyl-dlya-snu",
    kind: "toy",
    brand: "Jollein",
    badges: ["new"],
    price: 1979,
    image: landPhoto("DdBQ0kejSbi_1.jpg"),
    description: "Мінімалістичний спальник у рубчик зі знімними рукавами.",
    details: [
      { label: "Бренд", value: "Jollein" },
      { label: "Розміри", value: "60 / 70 / 90 см" },
    ],
  },

  /* ——— Іграшки, посуд і сон (bamboli.land) ——— */
  {
    id: "l-001",
    slug: "vedmedyk-jollein-teddy-bear",
    title: "Ведмедик Jollein Teddy Bear",
    subtitle: "м'яка іграшка · бісквітний",
    category: "igrashky",
    subcategory: "myaki-igrashky",
    kind: "toy",
    brand: "Jollein",
    badges: ["top"],
    price: 1139,
    image: landPhoto("Dc5XiPZDfmj_1.jpg"),
    description:
      "Іноді найулюбленіші іграшки — це ті, з якими просто хочеться бути поруч. Можна доповнити мобілем з ведмедиками.",
    details: [{ label: "Бренд", value: "Jollein" }],
  },
  {
    id: "l-004",
    slug: "knyzhka-jollein-tiny-park",
    title: "Книжка-шарудійка Jollein Tiny Park",
    subtitle: "тактильна · в дорогу",
    category: "igrashky",
    subcategory: "rozvyvayuchi-igrashky",
    kind: "toy",
    brand: "Jollein",
    price: 959,
    image: landPhoto("Dc9LxQmDasv_1.jpg"),
    description:
      "М'яка книжечка, що розвиває дрібну моторику. Зручно брати в коляску й автокрісло.",
    details: [{ label: "Бренд", value: "Jollein" }],
  },
  {
    id: "l-005",
    slug: "bryazkaltse-hryzunets-clucky",
    title: "Брязкальце-гризунець Clucky",
    subtitle: "сенсорне · від 3 місяців",
    category: "igrashky",
    subcategory: "gryzuntsi",
    kind: "toy",
    brand: "Done by Deer",
    price: 1139,
    image: landPhoto("Dc6weYGkSMH_1.jpg"),
    description:
      "Пісочне брязкальце з дзвіночком усередині й рельєфом для прорізування зубів.",
    details: [
      { label: "Вік", value: "Від 3 місяців" },
      { label: "Бренд", value: "Done by Deer" },
    ],
  },
  {
    id: "l-006",
    slug: "lanchboks-done-by-deer",
    title: "Двосекційний ланчбокс Done by Deer",
    subtitle: "150 + 320 мл · пісочний",
    category: "igrashky",
    subcategory: "posud",
    kind: "toy",
    brand: "Done by Deer",
    price: 569,
    image: landPhoto("Dc4FTSwjRvh_1.jpg"),
    description:
      "Герметичний ланчбокс для садочка й прогулянок. Можна заморожувати, гріти в мікрохвильовці (без кришки) і мити у верхньому кошику посудомийки.",
    details: [
      { label: "Матеріал", value: "Поліпропілен" },
      { label: "Бренд", value: "Done by Deer" },
    ],
  },
];

export const products: Product[] = seeds.map(build);
