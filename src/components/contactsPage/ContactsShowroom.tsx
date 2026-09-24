import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { contactsShowroom } from "@/data/contacts";
import { siteInfo } from "@/data/siteInfo";

export default function ContactsShowroom() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden bg-ink text-bg md:grid-cols-2">
            <div className="relative aspect-4/5 w-full md:aspect-auto md:min-h-[480px]">
              <Image
                src={contactsShowroom.image.src}
                alt={contactsShowroom.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
              <p className="u-label mb-5 text-bg/60">{contactsShowroom.label}</p>
              <h2 className="u-display max-w-[420px] text-[20px] leading-[1.12] sm:text-[30px] lg:text-[42px]">
                {contactsShowroom.title}
              </h2>

              <ul className="mt-8 space-y-2 text-[13px] text-bg/85">
                <li>{siteInfo.address}</li>
                <li>{siteInfo.hours}</li>
              </ul>

              <p className="mt-5 max-w-[380px] text-[13px] leading-relaxed text-bg/70">
                {contactsShowroom.note}
              </p>

              <a
                href={siteInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="u-label mt-10 self-start border border-bg px-7 py-4 transition duration-300 hover:bg-bg hover:text-ink"
              >
                {contactsShowroom.ctaLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
