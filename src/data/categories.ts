import { Category } from "@/types/product";

const img = (file: string) => `/images/bamboli/${file}`;

export const categories: Category[] = [
  {
    slug: "dlya-malyukiv",
    title: "Для малюків",
    caption: "Ромпери, пісочники й боді з м'яких натуральних тканин від 56 см.",
    image: img("products/DcyHUZyAG5o_1.jpg"),
  },
  {
    slug: "kostyumy",
    title: "Костюми",
    caption: "Льон, муслін і трикотаж — комплекти на щодень і на свято.",
    image: img("products/Dau5VCljHF6_1.jpg"),
  },
  {
    slug: "verkhniy-odyag",
    title: "Верхній одяг",
    caption: "Куртки, тренчі й бомбери у стриманих відтінках.",
    image: img("products/DdTpZ6sgAxN_1.jpg"),
  },
  {
    slug: "vyshyvanky",
    title: "Вишиванки",
    caption: "Власного пошиття, з яворівською вишивкою.",
    image: img("products/DbvJ1YpjGv7_1.jpg"),
  },
  {
    slug: "sukni",
    title: "Сукні",
    caption: "Ніжні сукні з комірцями й у клітинку.",
    image: img("products/DbQlNzOjF-w_1.jpg"),
  },
  {
    slug: "igrashky",
    title: "Іграшки, посуд і сон",
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
