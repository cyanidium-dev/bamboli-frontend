import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { paymentMethods } from "@/data/delivery";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Section from "@/components/shared/ui/Section";

export default function PaymentInfo() {
  return (
    <Section tone="mist" id="payment">
      <Container>
        <SectionHeading label="Оплата" title="Онлайн або при отриманні" className="max-w-[560px]" />

        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {paymentMethods.map((method, index) => (
            <li key={method.title} className="bg-mist">
              <Reveal delay={index * 0.05} className="h-full p-7">
                <h3 className="u-h3 mb-3">{method.title}</h3>
                <p className="u-body">
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
