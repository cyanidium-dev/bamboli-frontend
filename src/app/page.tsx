import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Faq from "@/components/shared/faq/Faq";
import Hero from "@/components/homePage/Hero";
import ProductCarousel from "@/components/homePage/ProductCarousel";
import CategoryStrip from "@/components/homePage/CategoryStrip";
import PromoBanner from "@/components/homePage/PromoBanner";
import VyshyvankaSpotlight from "@/components/homePage/VyshyvankaSpotlight";
import ToysCollection from "@/components/homePage/ToysCollection";
import Benefits from "@/components/homePage/Benefits";
import InstagramReels from "@/components/homePage/InstagramReels";
import Reviews from "@/components/homePage/Reviews";
import ContactSection from "@/components/homePage/ContactSection";
import { babyCollection, saleCollection } from "@/data/home";
import { faq } from "@/data/faq";
import {
  getCategories,
  getProductsByAudience,
  getProductsByCategory,
  getSaleProducts,
  getTopProducts,
} from "@/lib/api";

/** Block order: docs/spec/marketing-structure.md § 3.1. */
export default async function HomePage() {
  const [top, categories, girls, boys, baby, toys, sale] = await Promise.all([
    getTopProducts(8),
    getCategories(),
    getProductsByAudience("vyshyvanky", "girls", 4),
    getProductsByAudience("vyshyvanky", "boys", 4),
    getProductsByCategory("dlya-malyukiv", 8),
    getProductsByCategory("igrashky", 8),
    getSaleProducts(8),
  ]);

  return (
    <>
      <Hero />

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            label="Топ товарів"
            title="Найулюбленіше мамами"
            href="/catalog"
          />
          <ProductCarousel products={top} label="Топ товарів" />
        </Container>
      </section>

      <CategoryStrip categories={categories} />
      <PromoBanner />
      <VyshyvankaSpotlight girls={girls} boys={boys} />

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            label={babyCollection.label}
            title={babyCollection.title}
            href={babyCollection.href}
          />
          <ProductCarousel products={baby} label={babyCollection.label} />
        </Container>
      </section>

      <ToysCollection products={toys} />
      <Benefits />

      {sale.length > 0 && (
        <section className="pt-20 lg:pt-28">
          <Container>
            <SectionHeading
              label={saleCollection.label}
              title={saleCollection.title}
              href={saleCollection.href}
              hrefLabel="Усі знижки"
            />
            <ProductCarousel products={sale} label={saleCollection.label} />
          </Container>
        </section>
      )}

      <InstagramReels />
      <Reviews />
      <Faq items={faq.filter((item) => item.home)} allHref="/delivery#faq" />
      <ContactSection />
    </>
  );
}
