import type { Metadata } from "next";
import ContactsHero from "@/components/contactsPage/ContactsHero";
import ContactCards from "@/components/contactsPage/ContactCards";
import ContactsShowroom from "@/components/contactsPage/ContactsShowroom";
import QuickAnswers from "@/components/contactsPage/QuickAnswers";
import ContactsFormSection from "@/components/contactsPage/ContactsFormSection";
import ContactsSchema from "@/components/contactsPage/ContactsSchema";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Телефон, email, Telegram та Instagram Direct Bamboli, адреса шоуруму у Львові й форма зворотного зв'язку — відповідаємо щодня.",
};

/** Block order: docs/spec/marketing-structure.md § 3.8a. */
export default function ContactsPage() {
  return (
    <>
      <ContactsHero />
      <ContactCards />
      <ContactsShowroom />
      <QuickAnswers />
      <ContactsFormSection />
      <ContactsSchema />
    </>
  );
}
