import SectionHeading from "@/components/shared/ui/SectionHeading";
import Reveal from "@/components/shared/ui/Reveal";
import { howToChoose } from "@/data/sizeGuide";

export default function SizeGuideChoose() {
  return (
    <div className="mb-14 lg:mb-20">
      <SectionHeading label="Як обрати розмір" title="Три кроки до правильного розміру" />

      <ol className="grid gap-8 border-t border-line pt-8 sm:grid-cols-3 lg:gap-8">
        {howToChoose.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05}>
              <p className="u-label mb-3 text-clay">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="u-lead text-ink">
                {item.title}
              </h3>
              <p className="u-body mt-3">
                {item.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
