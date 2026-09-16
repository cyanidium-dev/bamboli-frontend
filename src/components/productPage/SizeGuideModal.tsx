"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Backdrop from "@/components/shared/ui/Backdrop";
import { CloseIcon } from "@/components/shared/ui/Icons";
import SizeChart from "@/components/shared/sizeGuide/SizeChart";

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

                <SizeChart />

                <Link
                  href="/size-guide"
                  onClick={onClose}
                  className="u-label mt-6 inline-block border-b border-ink pb-1 transition hover:opacity-60"
                >
                  Детальніше про розміри
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
