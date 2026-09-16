import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import LegalContent from "@/components/legalPage/LegalContent";
import { legalUpdatedAt, privacyHero, privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Як Bamboli збирає, використовує та захищає персональні дані покупців: оформлення замовлення, доставка, онлайн-оплата.",
};

export default function PrivacyPage() {
  return (
    <Container className="pb-20 pt-10 lg:pb-28 lg:pt-14">
      <CatalogHeader
        title={privacyHero.title}
        caption={privacyHero.text}
        breadcrumbs={[{ label: "Політика конфіденційності" }]}
      />

      <p className="u-label mb-8 text-muted lg:mb-10">Оновлено: {legalUpdatedAt}</p>

      <LegalContent sections={privacySections} />
    </Container>
  );
}
