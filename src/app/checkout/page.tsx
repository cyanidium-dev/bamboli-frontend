import type { Metadata } from "next";
import Page from "@/components/shared/ui/Page";
import CheckoutView from "@/components/checkoutPage/CheckoutView";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Page>
      <CheckoutView />
    </Page>
  );
}
