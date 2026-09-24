import Reveal from "@/components/shared/ui/Reveal";
import { careTips } from "@/data/sizeGuide";

export default function SizeGuideCare() {
  return (
    <div className="border-t border-line pt-10 lg:pt-14">
      <p className="u-label mb-3 text-muted">Окремі поради</p>
      <h2 className="u-display text-[20px] leading-[1.1] sm:text-[26px] lg:text-[36px]">
        Верхній одяг і вишиванки
      </h2>

      <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {careTips.map((tip, index) => (
          <li key={tip.title} className="bg-surface">
            <Reveal delay={index * 0.05} className="h-full p-7">
              <h3 className="u-label u-subheading mb-3">{tip.title}</h3>
              <p className="max-w-[420px] text-[13px] leading-relaxed text-muted">
                {tip.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
