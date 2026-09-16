import type { Metadata } from "next";
import AboutHero from "@/components/aboutPage/AboutHero";
import Story from "@/components/aboutPage/Story";
import Values from "@/components/aboutPage/Values";
import Fabrics from "@/components/aboutPage/Fabrics";
import ClothingSection from "@/components/aboutPage/ClothingSection";
import ToysSection from "@/components/aboutPage/ToysSection";
import Showroom from "@/components/aboutPage/Showroom";
import ContactsSummary from "@/components/aboutPage/ContactsSummary";

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "Bamboli — бренд-виробник дитячого одягу зі Львова: натуральні тканини, вишиванки власного пошиття та шоурум на Театральній, 12.",
};

/** Block order: docs/spec/marketing-structure.md § 3.8. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <Fabrics />
      <ClothingSection />
      <ToysSection />
      <Showroom />
      <ContactsSummary />
    </>
  );
}
