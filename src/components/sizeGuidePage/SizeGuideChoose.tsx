import Reveal from "@/components/shared/ui/Reveal";
import { howToChoose } from "@/data/sizeGuide";

export default function SizeGuideChoose() {
  return (
    <div className="mb-14 lg:mb-20">
      <p className="u-label mb-3 text-muted">Як обрати розмір</p>
      <h2 className="u-display text-[26px] leading-[1.1] lg:text-[36px]">
        Три кроки до правильного розміру
      </h2>

      <ol className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 lg:gap-8">
        {howToChoose.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05}>
              <p className="u-label mb-3 text-clay">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="u-subheading text-[17px] leading-[1.2]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {item.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
