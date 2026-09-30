import Section from "@/components/shared/ui/Section";
import Container from "@/components/shared/ui/Container";
import ContactForm from "@/components/shared/contactForm/ContactForm";
import { siteInfo } from "@/data/siteInfo";
import { InstagramIcon, TelegramIcon } from "@/components/shared/ui/Icons";

export default function SizeGuideContactSection() {
  return (
    <Section tone="sand">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="u-label mb-3 text-muted">Не впевнені з розміром?</p>
            <h2 className="u-h2">Допоможемо підібрати</h2>
            <p className="u-body mt-5 max-w-[380px]">
              Напишіть зріст і вік дитини та товар, що цікавить, — підкажемо
              розмір у зручному месенджері.
            </p>

            <ul className="mt-9 space-y-3 text-[13px]">
              <li>
                <a
                  href={siteInfo.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  <TelegramIcon className="size-4" />
                  Telegram {siteInfo.telegram.handle}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline inline-flex items-center gap-2.5"
                >
                  <InstagramIcon className="size-4" />
                  Instagram Direct {siteInfo.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          <ContactForm
            defaultTopic="Розмір"
            messagePlaceholder="Зріст і вік дитини, модель, що цікавить…"
          />
        </div>
      </Container>
    </Section>
  );
}
