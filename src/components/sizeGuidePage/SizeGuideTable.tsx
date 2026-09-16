import SizeChart from "@/components/shared/sizeGuide/SizeChart";
import { sizeGroups } from "@/data/sizeGuide";

export default function SizeGuideTable() {
  return (
    <div className="mb-14 border-t border-line pt-10 lg:mb-20 lg:pt-14">
      <p className="u-label mb-3 text-muted">Таблиця розмірів</p>
      <h2 className="u-display text-[26px] leading-[1.1] lg:text-[36px]">
        Зріст, вік і мірки
      </h2>

      <div className="mt-8 max-w-[640px]">
        <SizeChart />
      </div>

      <div className="mt-12 max-w-[640px]">
        <p className="u-label mb-3 text-muted">Розмірні групи Bamboli</p>
        <p className="mb-5 text-[13px] leading-relaxed text-muted">
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
