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
      <div>
        <table className="w-full border-collapse text-center text-[11px] tabular-nums sm:text-[12px]">
          <thead>
            <tr className="border-b border-ink">
              {chart.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="u-label py-2.5 px-1 align-bottom font-normal text-muted sm:px-2"
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
                    className="px-1 py-2.5 first:text-ink sm:px-2"
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
