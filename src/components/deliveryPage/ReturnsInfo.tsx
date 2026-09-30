import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { returnsSteps } from "@/data/delivery";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Section from "@/components/shared/ui/Section";

export default function ReturnsInfo() {
  return (
    <Section id="returns">
      <Container>
        <SectionHeading label="Обмін і повернення" title="Якщо розмір не підійшов" className="max-w-[560px]" />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {returnsSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.05}>
                <p className="u-label mb-3 text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="u-lead text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 u-body">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
