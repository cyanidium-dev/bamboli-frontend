import SectionHeading from "@/components/shared/ui/SectionHeading";
import Reveal from "@/components/shared/ui/Reveal";
import { careTips } from "@/data/sizeGuide";

export default function SizeGuideCare() {
  return (
    <div className="border-t border-line pt-10 lg:pt-14">
      <SectionHeading label="Окремі поради" title="Верхній одяг і вишиванки" />

      <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {careTips.map((tip, index) => (
          <li key={tip.title} className="bg-surface">
            <Reveal delay={index * 0.05} className="h-full p-7">
              <h3 className="u-label u-subheading mb-3">{tip.title}</h3>
              <p className="u-body max-w-[420px]">
                {tip.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
