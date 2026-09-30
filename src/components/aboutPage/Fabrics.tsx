import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { fabrics } from "@/data/about";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Section from "@/components/shared/ui/Section";

export default function Fabrics() {
  return (
    <Section tone="mist">
      <Container>
        <SectionHeading label="Наші тканини" title="Тільки те, що приємно шкірі" className="max-w-[560px]" />

        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {fabrics.map((fabric, index) => (
            <li key={fabric.title} className="bg-mist">
              <Reveal delay={index * 0.05} className="h-full p-7">
                <h3 className="u-label u-subheading mb-3">{fabric.title}</h3>
                <p className="u-body">
                  {fabric.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
