/** Shared by SizeGuideModal (product page) and /size-guide page. */
export const SIZE_ROWS = [
  { height: "50–56", age: "0–1 міс", chest: "40–42", waist: "40–42", length: "32" },
  { height: "56–62", age: "1–3 міс", chest: "42–44", waist: "42–44", length: "35" },
  { height: "62–68", age: "3–6 міс", chest: "44–46", waist: "44–46", length: "38" },
  { height: "68–74", age: "6–9 міс", chest: "46–48", waist: "46–47", length: "41" },
  { height: "74–80", age: "9–12 міс", chest: "48–50", waist: "47–48", length: "44" },
  { height: "80–86", age: "12–18 міс", chest: "50–52", waist: "48–50", length: "47" },
  { height: "86–92", age: "1,5–2 роки", chest: "52–53", waist: "50–51", length: "50" },
  { height: "92–98", age: "2–3 роки", chest: "53–54", waist: "51–52", length: "53" },
  { height: "98–104", age: "3–4 роки", chest: "54–56", waist: "52–53", length: "56" },
  { height: "104–110", age: "4–5 років", chest: "56–58", waist: "53–54", length: "59" },
  { height: "110–116", age: "5–6 років", chest: "58–60", waist: "54–55", length: "62" },
  { height: "116–122", age: "6–7 років", chest: "60–62", waist: "55–56", length: "65" },
];

export const SIZE_COLUMNS = [
  { key: "height", label: "Зріст" },
  { key: "age", label: "Вік" },
  { key: "chest", label: "Груди" },
  { key: "waist", label: "Талія" },
  { key: "length", label: "Довжина" },
] as const;

export const HOW_TO_MEASURE = [
  {
    title: "Зріст",
    text: "від маківки до п'ят, дитина стоїть рівно без взуття.",
  },
  {
    title: "Груди",
    text: "по найширшій частині грудної клітки під пахвами.",
  },
  {
    title: "Талія",
    text: "по лінії пупка, не затягуючи стрічку.",
  },
  {
    title: "Довжина",
    text: "довжина виробу від плеча до низу.",
  },
];
