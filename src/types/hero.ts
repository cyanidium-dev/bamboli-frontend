/**
 * Shape of one home hero slide. Mirrors the future Sanity `heroSlide`
 * document: `image` maps to an image field (src resolved via the image URL
 * builder), the rest are plain string fields.
 */
export interface HeroSlide {
  id: string;
  image: { src: string; alt: string };
  /** Short line above the title. */
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
  /** Desktop only: side of the slide the text block sits on. */
  textPosition: "left" | "right";
}
