import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import ContactForm from "@/components/shared/contactForm/ContactForm";
import { siteInfo } from "@/data/siteInfo";
import { InstagramIcon, TelegramIcon } from "@/components/shared/ui/Icons";

export default function DeliveryContactSection() {
  return (
    <section
      id="contacts"
      className="scroll-mt-[90px] mt-20 bg-sand py-16 lg:mt-28 lg:scroll-mt-[100px] lg:py-24 overflow-hidden"
    >
      <Container className="relative isolate">
        {/* Decorative accents from the Figma design — hidden on small screens where the two-column layout collapses. */}
        <Image
          src="/images/bamboli/decor/heart-white.svg"
          alt=""
          width={139}
          height={117}
          aria-hidden
          className="pointer-events-none absolute right-[5%] lg:left-[30%] bottom-[-12%] xs:bottom-[-18%] sm:bottom-[-22%] md:bottom-[-18%] lg:bottom-[-150px] -z-10 w-[40%] sm:w-[30%] md:w-[25%] lg:w-[11%] h-auto"
        />
        <Image
          src="/images/bamboli/decor/stitch-line-short.svg"
          alt=""
          width={549}
          height={15}
          aria-hidden
          className="pointer-events-none absolute left-[56%] xl:left-[53.4%] top-[91.7%] -z-10 hidden w-[38%] xl:w-[43.4%] h-auto lg:block"
        />
        <Image
          src="/images/bamboli/decor/ellipse-61.png"
          alt=""
          width={502}
          height={502}
          aria-hidden
          className="pointer-events-none absolute lg:left-[-1%] xl:left-[-7.4%] bottom-[-450px] xl:bottom-[-500px] -z-20 hidden w-[40%] xl:w-[43.4%] h-auto lg:block"
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="u-label mb-3 text-muted">Залишились питання?</p>
            <h2 className="u-display text-[20px] leading-[1.1] sm:text-[30px] lg:text-[42px]">
              Допоможемо з доставкою й оплатою
            </h2>
            <p className="mt-5 max-w-[380px] text-[13px] leading-relaxed text-muted">
              Напишіть номер замовлення чи запитання про обмін — відповідаємо в
              зручному месенджері щодня.
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
