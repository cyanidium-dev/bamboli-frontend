/**
 * Repeated interface texts (buttons, links, form messages). One place, so the
 * same action is always worded the same way. Rules: docs/spec/content-guidelines.md.
 * Page-specific copy stays in its own data file.
 */
export const uiText = {
  nav: {
    home: "Головна",
    toCatalog: "До каталогу",
    viewAll: "Дивитись усе",
    allQuestions: "Усі питання",
  },
  cart: {
    add: "Додати в кошик",
    checkout: "Оформити замовлення",
    confirmOrder: "Підтвердити замовлення",
  },
  form: {
    send: "Надіслати",
    sending: "Надсилаємо…",
    sendAnother: "Надіслати ще одне",
    thanks: "Дякуємо!",
    errors: {
      name: "Вкажіть ім'я",
      phone: "Вкажіть номер телефону",
      consent: "Потрібна згода",
    },
  },
} as const;
