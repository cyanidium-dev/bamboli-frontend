import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import { deliveryHero, deliverySections } from "@/data/delivery";

export default function DeliveryHero() {
  return (
    <Container className="pb-0 pt-10 lg:pt-14">
      <CatalogHeader
        title={deliveryHero.title}
        caption={deliveryHero.text}
        breadcrumbs={[{ label: "Доставка, оплата, повернення" }]}
      />

      <nav
        aria-label="Розділи сторінки"
        className="mb-16 flex flex-wrap gap-x-6 gap-y-3 border-y border-line py-5 lg:mb-24"
      >
        {deliverySections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="u-label border-b border-transparent pb-1 text-muted transition hover:border-ink hover:text-ink"
          >
            {section.label}
          </Link>
        ))}
      </nav>
    </Container>
  );
}
