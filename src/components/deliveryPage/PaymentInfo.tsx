import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { paymentMethods } from "@/data/delivery";

export default function PaymentInfo() {
  return (
    <section
      id="payment"
      className="scroll-mt-[90px] mt-16 bg-sand py-16 lg:mt-24 lg:scroll-mt-[100px] lg:py-24"
    >
      <Container>
        <div className="mb-10 max-w-[560px] lg:mb-14">
          <p className="u-label mb-3 text-muted">Оплата</p>
          <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
            Онлайн або при отриманні
          </h2>
        </div>

        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {paymentMethods.map((method, index) => (
            <li key={method.title} className="bg-sand">
              <Reveal delay={index * 0.05} className="h-full p-7">
                <h3 className="u-label u-subheading mb-3">{method.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">
                  {method.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
