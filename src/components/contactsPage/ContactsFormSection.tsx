import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import ContactForm from "@/components/shared/contactForm/ContactForm";
import { collab, legalDetails } from "@/data/contacts";
import { siteInfo } from "@/data/siteInfo";

export default function ContactsFormSection() {
  return (
    <section className="mt-20 bg-sand py-16 lg:mt-28 lg:py-24 overflow-hidden">
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

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <p className="u-label mb-3 text-muted">Напишіть нам</p>
              <h2 className="u-display text-[20px] leading-[1.1] sm:text-[30px] lg:text-[42px]">
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
