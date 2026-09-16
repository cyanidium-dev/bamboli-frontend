import type { Metadata } from "next";
import DeliveryHero from "@/components/deliveryPage/DeliveryHero";
import DeliveryInfo from "@/components/deliveryPage/DeliveryInfo";
import PaymentInfo from "@/components/deliveryPage/PaymentInfo";
import ReturnsInfo from "@/components/deliveryPage/ReturnsInfo";
import DeliveryContactSection from "@/components/deliveryPage/DeliveryContactSection";
import Faq from "@/components/shared/faq/Faq";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Доставка, оплата, повернення",
  description:
    "Доставка Новою Поштою по Україні, оплата MonoPay, LiqPay або накладеним платежем, умови обміну й повернення — і відповіді на часті питання.",
};

/** Block order: docs/spec/marketing-structure.md § 3.9. */
export default function DeliveryPage() {
  return (
    <>
      <DeliveryHero />
      <DeliveryInfo />
      <PaymentInfo />
      <ReturnsInfo />
      <Faq
        id="faq"
        items={faq.filter((item) => item.group === "delivery")}
        label="Питання й відповіді"
        title="Питання про доставку та оплату"
        description="Терміни відправки, вартість, оплата й замовлення під наявність."
      />
      <DeliveryContactSection />
    </>
  );
}
