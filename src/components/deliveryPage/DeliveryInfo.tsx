import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { deliveryMethods, deliveryTimeline } from "@/data/delivery";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Section from "@/components/shared/ui/Section";

export default function DeliveryInfo() {
  return (
    <Section spacing="flush" id="delivery">
      <Container>
        <SectionHeading label="Доставка" title="Новою Поштою по всій Україні" className="max-w-[560px]" />

        <ol className="grid gap-10 border-t border-line pt-10 sm:grid-cols-3 lg:gap-8">
          {deliveryTimeline.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05}>
                <p className="u-label mb-3 text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="u-lead text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 u-body">
                  {item.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-14">
          {deliveryMethods.map((method, index) => (
            <li key={method.title} className="bg-surface">
              <Reveal delay={index * 0.05} className="h-full p-7">
                <h3 className="u-h3 mb-3">{method.title}</h3>
                <p className="max-w-[420px] u-body">
                  {method.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
