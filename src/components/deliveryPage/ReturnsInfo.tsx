import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { returnsSteps } from "@/data/delivery";

export default function ReturnsInfo() {
  return (
    <section id="returns" className="scroll-mt-[90px] pt-16 lg:scroll-mt-[100px] lg:pt-24">
      <Container>
        <div className="mb-10 max-w-[560px] lg:mb-14">
          <p className="u-label mb-3 text-muted">Обмін і повернення</p>
          <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
            Якщо розмір не підійшов
          </h2>
        </div>

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {returnsSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.05}>
                <p className="u-label mb-3 text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="u-subheading text-[18px] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
