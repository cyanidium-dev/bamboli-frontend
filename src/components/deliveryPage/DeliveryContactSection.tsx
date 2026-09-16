import Container from "@/components/shared/ui/Container";
import ContactForm from "@/components/shared/contactForm/ContactForm";
import { siteInfo } from "@/data/siteInfo";
import { InstagramIcon, TelegramIcon } from "@/components/shared/ui/Icons";

export default function DeliveryContactSection() {
  return (
    <section
      id="contacts"
      className="scroll-mt-[90px] mt-20 bg-sand py-16 lg:mt-28 lg:scroll-mt-[100px] lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="u-label mb-3 text-muted">Залишились питання?</p>
            <h2 className="u-display text-[30px] leading-[1.1] lg:text-[42px]">
              Допоможемо з доставкою й оплатою
            </h2>
            <p className="mt-5 max-w-[380px] text-[13px] leading-relaxed text-muted">
              Напишіть номер замовлення чи запитання про обмін — відповідаємо
              в зручному месенджері щодня.
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
            defaultTopic="Обмін"
            messagePlaceholder="Номер замовлення й ваше питання про доставку, оплату чи обмін…"
          />
        </div>
      </Container>
    </section>
  );
}
