import type { Metadata } from "next";
import Page from "@/components/shared/ui/Page";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import LegalContent from "@/components/legalPage/LegalContent";
import { legalUpdatedAt, offerHero, offerSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Публічна оферта",
  description:
    "Умови продажу товарів інтернет-магазину Bamboli: оформлення замовлення, оплата MonoPay/LiqPay, доставка Новою Поштою, обмін і повернення.",
};

export default function OfferPage() {
  return (
    <Page>
      <CatalogHeader
        title={offerHero.title}
        caption={offerHero.text}
        breadcrumbs={[{ label: "Публічна оферта" }]}
      />

      <p className="u-label mb-8 text-muted lg:mb-10">Оновлено: {legalUpdatedAt}</p>

      <LegalContent sections={offerSections} />
    </Page>
  );
}
