import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { values, valuesImage } from "@/data/about";

export default function Values() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="relative mb-10 max-w-[560px] lg:mb-14">
          <span
            aria-hidden
            className="u-display pointer-events-none absolute -top-8 right-0 hidden select-none text-[140px] leading-none text-line lg:block"
          >
            03
          </span>
          <p className="u-label mb-3 text-muted">Наші цінності</p>
          <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
            Що для нас важливо
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Reveal>
            <div className="relative aspect-4/5 w-full overflow-hidden bg-sand lg:h-full lg:aspect-auto">
              <Image
                src={valuesImage.src}
                alt={valuesImage.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {values.map((value, index) => (
              <li
                key={value.title}
                className={
                  index === values.length - 1
                    ? "bg-bg sm:col-span-2"
                    : "bg-bg"
                }
              >
                <Reveal delay={index * 0.05} className="h-full p-6 lg:p-7">
                  <p className="u-label mb-3 text-clay">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="u-label mb-2">{value.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {value.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
