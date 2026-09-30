import Page from "@/components/shared/ui/Page";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import { contactsHero } from "@/data/contacts";

export default function ContactsHero() {
  return (
    <div className="flow-root bg-mist">
      <Page bottom={false}>
        <CatalogHeader
          title={contactsHero.title}
          caption={contactsHero.text}
          breadcrumbs={[{ label: "Контакти" }]}
        />
      </Page>
    </div>
  );
}
