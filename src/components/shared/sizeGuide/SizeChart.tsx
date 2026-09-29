import type { SizeChartData } from "@/types/product";
import { DEFAULT_SIZE_CHART, HOW_TO_MEASURE } from "./sizeChartData";

/** Table + measuring notes. Shared by SizeGuideModal and /size-guide. */
export default function SizeChart({
  chart = DEFAULT_SIZE_CHART,
}: {
  chart?: SizeChartData;
}) {
  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[440px] border-collapse text-left text-[12px] tabular-nums">
          <thead>
            <tr className="border-b border-ink">
              {chart.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="u-label py-2.5 pr-3 font-normal text-muted last:pr-0"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row, index) => (
              <tr key={index} className="border-b border-line">
                {chart.columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-2.5 pr-3 last:pr-0 first:text-ink"
                  >
                    {row[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {chart.note && (
        <p className="mt-4 text-[12px] leading-relaxed text-muted">{chart.note}</p>
      )}

      <div className="mt-6 space-y-2 text-[12px] leading-relaxed text-muted">
        <p className="u-label text-ink">Як зняти мірки</p>
        {HOW_TO_MEASURE.map((item) => (
          <p key={item.title}>
            <span className="text-ink">{item.title}</span> — {item.text}
          </p>
        ))}
      </div>
    </>
  );
}
