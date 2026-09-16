import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { fabrics } from "@/data/about";

export default function Fabrics() {
  return (
    <section className="mt-20 bg-sand py-16 lg:mt-28 lg:py-24">
      <Container>
        <div className="mb-10 max-w-[560px] lg:mb-14">
          <p className="u-label mb-3 text-muted">Наші тканини</p>
          <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
            Тільки те, що приємно шкірі
          </h2>
        </div>

        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {fabrics.map((fabric, index) => (
            <li key={fabric.title} className="bg-sand">
              <Reveal delay={index * 0.05} className="h-full p-7">
                <h3 className="u-label mb-3">{fabric.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">
                  {fabric.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
