"use client";

import { AnimatePresence, motion } from "motion/react";
import Backdrop from "@/components/shared/ui/Backdrop";
import { CloseIcon } from "@/components/shared/ui/Icons";

// Placeholder measurements until the real size chart arrives from production.
const SIZE_ROWS = [
  { height: "50–56", age: "0–1 міс", chest: "40–42", waist: "40–42", length: "32" },
  { height: "56–62", age: "1–3 міс", chest: "42–44", waist: "42–44", length: "35" },
  { height: "62–68", age: "3–6 міс", chest: "44–46", waist: "44–46", length: "38" },
  { height: "68–74", age: "6–9 міс", chest: "46–48", waist: "46–47", length: "41" },
  { height: "74–80", age: "9–12 міс", chest: "48–50", waist: "47–48", length: "44" },
  { height: "80–86", age: "12–18 міс", chest: "50–52", waist: "48–50", length: "47" },
  { height: "86–92", age: "1,5–2 роки", chest: "52–53", waist: "50–51", length: "50" },
  { height: "92–98", age: "2–3 роки", chest: "53–54", waist: "51–52", length: "53" },
  { height: "98–104", age: "3–4 роки", chest: "54–56", waist: "52–53", length: "56" },
  { height: "104–110", age: "4–5 років", chest: "56–58", waist: "53–54", length: "59" },
  { height: "110–116", age: "5–6 років", chest: "58–60", waist: "54–55", length: "62" },
  { height: "116–122", age: "6–7 років", chest: "60–62", waist: "55–56", length: "65" },
];

const COLUMNS = [
  { key: "height", label: "Зріст" },
  { key: "age", label: "Вік" },
  { key: "chest", label: "Груди" },
  { key: "waist", label: "Талія" },
  { key: "length", label: "Довжина" },
] as const;

export default function SizeGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Backdrop isVisible={isOpen} onClose={onClose} />
      <AnimatePresence>
        {isOpen && (
          <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="size-guide-title"
              className="pointer-events-auto flex max-h-[88dvh] w-full max-w-[640px] flex-col bg-bg"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-6">
                <p id="size-guide-title" className="u-label">
                  Таблиця розмірів
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Закрити таблицю розмірів"
                  className="-mr-2 flex size-9 items-center justify-center transition hover:opacity-60"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              <div className="no-scrollbar overflow-y-auto px-5 py-5 lg:px-6">
                <p className="mb-5 text-[13px] leading-relaxed text-muted">
                  Розмір відповідає зросту дитини. Якщо малюк між розмірами —
                  беріть більший, щоб річ прослужила довше. Усі мірки в
                  сантиметрах.
                </p>

                <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
                  <table className="w-full min-w-[440px] border-collapse text-left text-[12px] tabular-nums">
                    <thead>
                      <tr className="border-b border-ink">
                        {COLUMNS.map((column) => (
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
                      {SIZE_ROWS.map((row) => (
                        <tr key={row.height} className="border-b border-line">
                          {COLUMNS.map((column) => (
                            <td
                              key={column.key}
                              className="py-2.5 pr-3 last:pr-0 first:text-ink"
                            >
                              {row[column.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-2 text-[12px] leading-relaxed text-muted">
                  <p className="u-label text-ink">Як зняти мірки</p>
                  <p>
                    <span className="text-ink">Зріст</span> — від маківки до
                    п&apos;ят, дитина стоїть рівно без взуття.
                  </p>
                  <p>
                    <span className="text-ink">Груди</span> — по найширшій
                    частині грудної клітки під пахвами.
                  </p>
                  <p>
                    <span className="text-ink">Талія</span> — по лінії пупка,
                    не затягуючи стрічку.
                  </p>
                  <p>
                    <span className="text-ink">Довжина</span> — довжина виробу
                    від плеча до низу.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
