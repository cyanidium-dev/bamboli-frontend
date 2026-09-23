import Container from "@/components/shared/ui/Container";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import { contactsHero } from "@/data/contacts";

export default function ContactsHero() {
  return (
    <div className="flow-root bg-mist">
      <Container className="pb-0 pt-10 lg:pt-14">
        <CatalogHeader
          title={contactsHero.title}
          caption={contactsHero.text}
          breadcrumbs={[{ label: "Контакти" }]}
        />
      </Container>
    </div>
  );
}
