import Container from "@/components/shared/ui/Container";
import ContactForm from "@/components/shared/contactForm/ContactForm";
import { collab, legalDetails } from "@/data/contacts";
import { siteInfo } from "@/data/siteInfo";

export default function ContactsFormSection() {
  return (
    <section className="mt-20 bg-sand py-16 lg:mt-28 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <p className="u-label mb-3 text-muted">Напишіть нам</p>
              <h2 className="u-display text-[30px] leading-[1.1] lg:text-[42px]">
                Форма зворотного зв&apos;язку
              </h2>
              <p className="mt-5 max-w-[380px] text-[13px] leading-relaxed text-muted">
                Оберіть тему й розкажіть, чим допомогти — відповімо в
                зручному месенджері.
              </p>
            </div>

            <div>
              <p className="u-label mb-2 text-ink">{collab.label}</p>
              <p className="max-w-[380px] text-[13px] leading-relaxed text-muted">
                {collab.text}{" "}
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="u-underline text-ink"
                >
                  {siteInfo.email}
                </a>
              </p>
            </div>

            <div>
              <p className="u-label mb-2 text-ink">{legalDetails.label}</p>
              <ul className="space-y-1.5 text-[13px] text-muted">
                <li>{legalDetails.legalName}</li>
                <li>ЄДРПОУ {legalDetails.edrpou}</li>
                <li>{legalDetails.address}</li>
              </ul>
            </div>
          </div>

          <ContactForm
            withTopic
            defaultTopic="Інше"
            messagePlaceholder="Ваше питання: зріст і вік дитини, номер замовлення, пропозиція про співпрацю…"
          />
        </div>
      </Container>
    </section>
  );
}
