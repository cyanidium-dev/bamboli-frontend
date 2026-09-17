import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import CartDrawer from "@/components/shared/cart/CartDrawer";
import FlyToCartLayer from "@/components/shared/addToCart/FlyToCartLayer";
import SearchProvider from "@/components/shared/search/SearchProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const azbuka = localFont({
  src: "../fonts/Azbuka04.ttf",
  variable: "--font-azbuka",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: production domain.
  metadataBase: new URL("https://bamboli.ua"),
  title: {
    default: "Bamboli — базовий дитячий одяг як у дорослих",
    template: "%s · Bamboli",
  },
  description:
    "Дитячий одяг власного виробництва зі Львова: натуральні тканини, вишиванки, розміри 56–164 см. Іграшки, посуд і товари для сну Done by Deer та Jollein.",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Bamboli",
    images: ["/images/bamboli/site/lifestyle-street-boutique.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${azbuka.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <FlyToCartLayer />
        <SearchProvider />
      </body>
    </html>
  );
}
