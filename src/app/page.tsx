import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Faq from "@/components/shared/faq/Faq";
import Hero from "@/components/homePage/Hero";
import ProductCarousel from "@/components/homePage/ProductCarousel";
import ProductCarouselTabs from "@/components/homePage/ProductCarouselTabs";
import CategoryStrip from "@/components/homePage/CategoryStrip";
import PromoBanner from "@/components/homePage/PromoBanner";
import VyshyvankaSpotlight from "@/components/homePage/VyshyvankaSpotlight";
import ToysCollection from "@/components/homePage/ToysCollection";
import Benefits from "@/components/homePage/Benefits";
import InstagramReels from "@/components/homePage/InstagramReels";
import Reviews from "@/components/homePage/Reviews";
import ContactSection from "@/components/homePage/ContactSection";
import { babyCollection, categoryTiles, newCollection, saleCollection } from "@/data/home";
import { faq } from "@/data/faq";
import {
  getNewProducts,
  getOdyagProducts,
  getProductsByCategory,
  getSaleProducts,
  getTopProducts,
  getVyshyvankaProducts,
} from "@/lib/api";

/** Block order: docs/spec/marketing-structure.md § 3.1. */
export default async function HomePage() {
  const [
    novelties,
    noveltiesGirls,
    noveltiesBoys,
    noveltiesBabies,
    top,
    topGirls,
    topBoys,
    topBabies,
    vyshyvankaAll,
    girls,
    boys,
    vyshyvankaBabies,
    baby,
    toys,
    sale,
    saleGirls,
    saleBoys,
    saleBabies,
  ] = await Promise.all([
    getNewProducts(10),
    getNewProducts(10, "divchatka"),
    getNewProducts(10, "khlopchyky"),
    getNewProducts(10, "malyuky"),
    getTopProducts(8),
    getTopProducts(8, "divchatka"),
    getTopProducts(8, "khlopchyky"),
    getTopProducts(8, "malyuky"),
    getVyshyvankaProducts(undefined, 4),
    getVyshyvankaProducts("divchatka", 4),
    getVyshyvankaProducts("khlopchyky", 4),
    getVyshyvankaProducts("malyuky", 4),
    getOdyagProducts("malyuky", undefined, 8),
    getProductsByCategory("igrashky", 8),
    getSaleProducts(8),
    getSaleProducts(8, "divchatka"),
    getSaleProducts(8, "khlopchyky"),
    getSaleProducts(8, "malyuky"),
  ]);

  return (
    <>
      <Hero />

      {novelties.length > 0 && (
        <section className="pt-20 lg:pt-28">
          <Container>
            <SectionHeading
              label={newCollection.label}
              title={newCollection.title}
              href={newCollection.href}
            />
            <ProductCarouselTabs
              all={novelties}
              girls={noveltiesGirls}
              boys={noveltiesBoys}
              babies={noveltiesBabies}
              label={newCollection.label}
            />
          </Container>
        </section>
      )}

      <CategoryStrip categories={categoryTiles} />

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            label="Топ товарів"
            title="Найпопулярніше для ваших малюків"
            href="/catalog"
          />
          <ProductCarouselTabs
            all={top}
            girls={topGirls}
            boys={topBoys}
            babies={topBabies}
            label="Топ товарів"
          />
        </Container>
      </section>

      <PromoBanner />
      <VyshyvankaSpotlight
        all={vyshyvankaAll}
        girls={girls}
        boys={boys}
        babies={vyshyvankaBabies}
      />

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
            <ProductCarouselTabs
              all={sale}
              girls={saleGirls}
              boys={saleBoys}
              babies={saleBabies}
              label={saleCollection.label}
            />
          </Container>
        </section>
      )}

      <InstagramReels />
      <Reviews />
      <Faq items={faq.filter((item) => item.home)} decorative />
      <ContactSection />
    </>
  );
}
