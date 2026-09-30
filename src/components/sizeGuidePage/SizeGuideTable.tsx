import SectionHeading from "@/components/shared/ui/SectionHeading";
import SizeChart from "@/components/shared/sizeGuide/SizeChart";
import { sizeGroups } from "@/data/sizeGuide";

export default function SizeGuideTable() {
  return (
    <div className="mb-14 border-t border-line pt-10 lg:mb-20 lg:pt-14">
      <SectionHeading label="Мірки" title="Як правильно виміряти" />

      <div className="max-w-[640px]">
        <SizeChart />
      </div>

      <div className="mt-12 max-w-[640px]">
        <p className="u-label mb-3 text-muted">Розмірні групи Bamboli</p>
        <p className="u-body mb-5">
          На картці товару розмір обирається за розмірною групою — від неї
          залежить кількість тканини й фурнітури, тому ціна на різні розміри
          одного виробу може відрізнятися.
        </p>

        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[320px] border-collapse text-left text-[12px] tabular-nums">
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="u-label py-2.5 pr-3 font-normal text-muted">
                  Розмірна група (см)
                </th>
                <th scope="col" className="u-label py-2.5 pr-3 font-normal text-muted">
                  Вік
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeGroups.map((row) => (
                <tr key={row.group} className="border-b border-line">
                  <td className="py-2.5 pr-3 text-ink">{row.group}</td>
                  <td className="py-2.5 pr-3">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
