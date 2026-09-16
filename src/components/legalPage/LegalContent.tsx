import { LegalSection } from "@/data/legal";

export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="max-w-[720px] space-y-8 text-[15px] leading-relaxed text-ink lg:space-y-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="u-display mb-4 text-[20px] leading-[1.2] lg:text-[24px]">
            {section.heading}
          </h2>

          {section.paragraphs?.map((paragraph, index) => (
            <p key={index} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}

          {section.list && (
            <ul className="list-none space-y-2">
              {section.list.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-clay" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
