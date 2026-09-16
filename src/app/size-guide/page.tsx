import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import SizeGuideChoose from "@/components/sizeGuidePage/SizeGuideChoose";
import SizeGuideTable from "@/components/sizeGuidePage/SizeGuideTable";
import SizeGuideCare from "@/components/sizeGuidePage/SizeGuideCare";
import SizeGuideContactSection from "@/components/sizeGuidePage/SizeGuideContactSection";
import { sizeGuideHero } from "@/data/sizeGuide";

export const metadata: Metadata = {
  title: "Таблиця розмірів",
  description:
    "Таблиця розмірів дитячого одягу Bamboli: як обрати розмір за зростом дитини, мірки та поради для верхнього одягу й вишиванок.",
};

/** Block order: docs/spec/marketing-structure.md § 3.10. */
export default function SizeGuidePage() {
  return (
    <>
      <Container className="pb-0 pt-10 lg:pt-14">
        <CatalogHeader
          title={sizeGuideHero.title}
          caption={sizeGuideHero.text}
          breadcrumbs={[{ label: "Таблиця розмірів" }]}
        />

        <SizeGuideChoose />
        <SizeGuideTable />
        <SizeGuideCare />
      </Container>

      <SizeGuideContactSection />
    </>
  );
}
