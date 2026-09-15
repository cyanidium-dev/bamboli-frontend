/**
 * Full FAQ (docs/spec/marketing-structure.md § 4). `home: true` marks the
 * questions shown on the home page; /delivery renders all of them.
 * Answers marked TODO are placeholder wording — confirm with the client.
 */

export type FaqGroup = "size" | "fabrics" | "delivery" | "brand";

export interface FaqItem {
  id: string;
  group: FaqGroup;
  question: string;
  answer: string;
  home?: boolean;
}

export const faqGroups: Record<FaqGroup, string> = {
  size: "Розмір",
  fabrics: "Тканини, догляд, безпечність",
  delivery: "Доставка й оплата",
  brand: "Бренд і магазин",
};

export const faq: FaqItem[] = [
  {
    id: "choose-size",
    group: "size",
    home: true,
    question: "Як обрати розмір?",
    answer:
      "Орієнтуйтеся на зріст дитини в сантиметрах: розмірні групи Bamboli — 56–68, 74–86, 80–104, 110–134 і 140–164 см. Якщо зріст на межі двох груп, беріть більшу — речі вільного крою й носяться довше. Не впевнені? Напишіть нам зріст і вік дитини, підкажемо.",
  },
  {
    id: "price-by-size",
    group: "size",
    home: true,
    question: "Чому ціна різна для різних розмірів?",
    answer:
      "На більший розмір іде більше тканини й фурнітури, тому ціна залежить від розмірної групи. На картці товару ціна змінюється, щойно ви обираєте розмір.",
  },
  {
    id: "custom-measurements",
    group: "size",
    // TODO: answer from the client.
    question: "Чи можна пошити за індивідуальними замірами?",
    answer:
      "Напишіть нам у Telegram або через форму на сайті — уточнимо, чи можливо пошити обрану модель за вашими замірами, і скільки це займе часу.",
  },
  {
    id: "exchange-size",
    group: "size",
    // TODO: confirm exchange terms.
    question: "Чи можна обміняти, якщо розмір не підійшов?",
    answer:
      "Так. Якщо річ не була у вжитку й збережено бирки, ми обміняємо її на інший розмір. Детальні умови — на сторінці «Доставка, оплата, повернення».",
  },
  {
    id: "temperature",
    group: "fabrics",
    home: true,
    question: "Для якої погоди цей виріб?",
    answer:
      "Температурний режим і рівень утеплення вказуємо в характеристиках на картці товару. Якщо сумніваєтесь, як вдягнути дитину на прогулянку, — напишіть, порадимо шари.",
  },
  {
    id: "composition",
    group: "fabrics",
    home: true,
    question: "Який склад тканин?",
    answer:
      "Ми працюємо з натуральними тканинами: льон, муслін, велюр, трикотаж double face, вельвет. Точний склад кожної речі — під назвою та в характеристиках на картці товару.",
  },
  {
    id: "washing",
    group: "fabrics",
    // TODO: confirm care instructions.
    question: "Як прати льон і вишиванки?",
    answer:
      "Делікатне прання при 30 °C, без відбілювачів, вишиванки — навиворіт. Сушіть розправленими й прасуйте злегка вологими з виворітного боку.",
  },
  {
    id: "toys-safety",
    group: "fabrics",
    home: true,
    question: "Чи безпечні іграшки та посуд для малюків?",
    answer:
      "Ми обираємо бренди, які використовують безпечні матеріали: харчовий силікон, безпечний поліпропілен, м'які тканини. Вік, матеріал і догляд (зокрема, чи можна мити в посудомийці) вказані на картці кожного товару.",
  },
  {
    id: "shipping-time",
    group: "delivery",
    home: true,
    // TODO: confirm dispatch times.
    question: "Скільки часу займає відправка й доставка?",
    answer:
      "Товари в наявності відправляємо Новою Поштою протягом 1–2 робочих днів, доставка зазвичай займає 1–3 дні. Для моделей під замовлення термін пошиття вказуємо окремо.",
  },
  {
    id: "payment",
    group: "delivery",
    home: true,
    question: "Як оплатити замовлення?",
    answer:
      "Онлайн карткою через MonoPay чи LiqPay або накладеним платежем при отриманні у відділенні чи поштоматі Нової Пошти (комісія за тарифами перевізника).",
  },
  {
    id: "abroad",
    group: "delivery",
    question: "Чи є доставка за кордон?",
    answer:
      "Зараз ми доставляємо лише Новою Поштою по Україні — у відділення або поштомат.",
  },
  {
    id: "pre-order",
    group: "delivery",
    home: true,
    question: "Товару немає в наявності — чи можна під замовлення?",
    answer:
      "Часто так: ми шиємо самі, тому можемо відшити потрібний розмір чи колір. Напишіть нам — назвемо терміни.",
  },
  {
    id: "where-sewn",
    group: "brand",
    question: "Де ви шиєте?",
    answer:
      "У Львові, на власному виробництві. Ми самі розробляємо моделі, обираємо тканини й контролюємо кожен етап.",
  },
  {
    id: "try-on",
    group: "brand",
    home: true,
    question: "Чи можна приміряти наживо?",
    answer:
      "Так, приходьте в наш шоурум у Львові на вул. Театральній, 12. Там можна приміряти одяг і подивитися іграшки bamboli.land.",
  },
  {
    id: "gift-wrap",
    group: "brand",
    // TODO: confirm gift wrapping.
    question: "Чи є подарункове пакування?",
    answer:
      "Так, напишіть про це в коментарі до замовлення — упакуємо як подарунок.",
  },
  {
    id: "one-cart",
    group: "brand",
    home: true,
    question: "Чи можна замовити одяг та іграшки разом?",
    answer:
      "Так, усе в одному кошику: одяг Bamboli, іграшки, посуд і товари для сну — одне замовлення й одна доставка.",
  },
];
