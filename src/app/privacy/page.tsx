import type { Metadata } from "next";
import Page from "@/components/shared/ui/Page";
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
    <Page>
      <CatalogHeader
        title={privacyHero.title}
        caption={privacyHero.text}
        breadcrumbs={[{ label: "Політика конфіденційності" }]}
      />

      <p className="u-label mb-8 text-muted lg:mb-10">Оновлено: {legalUpdatedAt}</p>

      <LegalContent sections={privacySections} />
    </Page>
  );
}
