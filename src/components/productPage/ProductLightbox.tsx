"use client";

import dynamic from "next/dynamic";

import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

export default function ProductLightbox({
  images,
  alt,
  index,
  onIndexChange,
  isOpen,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (images.length === 0) return null;

  return (
    <>
      {/* The lightbox's own scroll lock pads <body>, but this project's
          scrollbar lives on <html> — that padding only squeezes the layout
          instead of compensating anything. Reuse the app's own scroll lock
          (`:root:has(.no-doc-scroll)` in globals.css) instead. */}
      {isOpen && <span className="no-doc-scroll hidden" aria-hidden />}
      <Lightbox
        open={isOpen}
        close={onClose}
        index={index}
        on={{ view: ({ index: i }) => onIndexChange(i) }}
        slides={images.map((src) => ({ src, alt }))}
        animation={{
          fade: 400,
          swipe: 700,
          navigation: 700,
          easing: {
            fade: "ease-out",
            swipe: "cubic-bezier(0.22, 1, 0.36, 1)",
            navigation: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
        }}
        carousel={{ finite: images.length === 1 }}
        controller={{ closeOnBackdropClick: true }}
        noScroll={{ disabled: true }}
        styles={{
          container: { backgroundColor: "rgba(23, 22, 20, 0.9)" },
        }}
      />
    </>
  );
}
