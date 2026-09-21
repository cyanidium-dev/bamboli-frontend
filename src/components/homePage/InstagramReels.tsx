import Image from "next/image";
import Container from "@/components/shared/ui/Container";
import InViewVideo from "@/components/shared/ui/InViewVideo";
import { reels } from "@/data/home";
import { siteInfo } from "@/data/siteInfo";
import { InstagramIcon, TelegramIcon } from "@/components/shared/ui/Icons";

export default function InstagramReels() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="u-label mb-3 text-muted">Ми в Instagram</p>
            <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
              {siteInfo.instagram.handle}
            </h2>
            <p className="mt-3 text-[13px] text-muted">
              <span className="text-ink">{siteInfo.instagram.followers}</span>{" "}
              родин стежать за новинками, закулісся й дітками в Bamboli
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteInfo.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="u-label flex items-center gap-2 border border-ink bg-ink px-6 py-3.5 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
            >
              <InstagramIcon className="size-4" />
              Підписатися
            </a>
            <a
              href={siteInfo.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="u-label flex items-center gap-2 border border-ink/25 px-6 py-3.5 transition duration-300 hover:border-ink"
            >
              <TelegramIcon className="size-4" />
              Telegram
            </a>
          </div>
        </div>

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
          {reels.map((reel) => (
            <li
              key={reel.id}
              className="w-[42vw] shrink-0 snap-start sm:w-[30vw] lg:w-auto"
            >
              <div className="relative aspect-9/16 overflow-hidden bg-sand">
                {reel.video ? (
                  <InViewVideo
                    src={reel.video}
                    poster={reel.poster}
                    className="absolute inset-0"
                  />
                ) : (
                  <Image
                    src={reel.poster}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 42vw, (max-width: 1023px) 30vw, 16vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/60 to-transparent px-3 pb-3 pt-12 text-[11px] leading-snug text-bg">
                  {reel.caption}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
