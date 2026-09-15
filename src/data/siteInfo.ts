/**
 * Contacts and brand facts in one place.
 * Everything marked TODO is a placeholder — replace before launch.
 */
export const siteInfo = {
  name: "Bamboli",
  tagline: "Базовий дитячий одяг як у дорослих",

  // TODO: real phone, email and working hours from the client.
  phone: "+38 (000) 000-00-00",
  phoneHref: "tel:+380000000000",
  email: "hello@bamboli.ua",
  hours: "Пн–Сб 10:00–19:00, Нд 11:00–17:00",

  address: "Львів, вул. Театральна, 12",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%2C+%D0%B2%D1%83%D0%BB.+%D0%A2%D0%B5%D0%B0%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%2C+12",

  instagram: {
    handle: "@bamboli.ua",
    url: "https://www.instagram.com/bamboli.ua/",
    followers: "53,4 тис.",
  },
  instagramLand: {
    handle: "@bamboli.land",
    url: "https://www.instagram.com/bamboli.land/",
  },
  telegram: { handle: "@bamboli_sale", url: "https://t.me/bamboli_sale" },
  threads: { handle: "@bamboli.ua", url: "https://www.threads.net/@bamboli.ua" },
} as const;
