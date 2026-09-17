import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { promo } from "@/data/home";

export default function PromoBanner() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <Link href={promo.cta.href} className="block">
            <Image
              src={promo.imageMobile.src}
              alt={promo.imageMobile.alt}
              width={promo.imageMobile.width}
              height={promo.imageMobile.height}
              sizes="100vw"
              className="h-auto w-full lg:hidden"
            />
            <Image
              src={promo.image.src}
              alt={promo.image.alt}
              width={promo.image.width}
              height={promo.image.height}
              sizes="1280px"
              className="hidden h-auto w-full lg:block"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
