import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Design-system guard rails (docs/spec/design-system.md).
 * A value outside the scale is a deliberate exception: keep it, and say why
 * with `// eslint-disable-next-line no-restricted-syntax -- <reason>`.
 */
const message = (text) => `${text} Дивись docs/spec/design-system.md.`;

const designRules = [
  {
    pattern: "/text-\\[(?!1[0-5]px\\])[0-9.]+px\\]/",
    text: "Розмір тексту поза шкалою (10–15px): бери роль (u-h1, u-h2, u-body, u-small…).",
  },
  {
    pattern: "/(^|[\\s:])z-\\[/",
    text: "Довільний z-index: бери токен (z-header, z-modal…) або z-10 / z-20 для локального шару.",
  },
  {
    pattern: "/(bg|text|border|fill|stroke|from|via|to)-\\[#/",
    text: "HEX-колір у класі: бери токен палітри (ink, muted, clay, sand, mist, line).",
  },
  {
    pattern: "/(^|[\\s:])duration-\\[/",
    text: "Довільна тривалість: бери токен (duration-(--duration-fast|base|slow)).",
  },
].flatMap(({ pattern, text }) => [
  { selector: `Literal[value=${pattern}]`, message: message(text) },
  { selector: `TemplateElement[value.raw=${pattern}]`, message: message(text) },
]);

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", ...designRules],
      // Existing `mounted` / hydration pattern; revisit separately.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default eslintConfig;
