import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { deliveryMethods, deliveryTimeline } from "@/data/delivery";

export default function DeliveryInfo() {
  return (
    <section id="delivery" className="scroll-mt-[90px] lg:scroll-mt-[100px]">
      <Container>
        <div className="mb-10 max-w-[560px] lg:mb-14">
          <p className="u-label mb-3 text-muted">Доставка</p>
          <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
            Новою Поштою по всій Україні
          </h2>
        </div>

        <ol className="grid gap-10 border-t border-line pt-10 sm:grid-cols-3 lg:gap-8">
          {deliveryTimeline.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05}>
                <p className="u-label mb-3 text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="u-subheading text-[18px] leading-[1.2]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
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
                <h3 className="u-label u-subheading mb-3">{method.title}</h3>
                <p className="max-w-[420px] text-[13px] leading-relaxed text-muted">
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
