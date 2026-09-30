import { cn } from "@/lib/utils";

type Tone = "white" | "mist" | "sand";

/**
 * default — the section opens with the standard gap (margin above a coloured
 *           block, padding above a plain one).
 * flush   — no gap above: the section continues the block before it.
 */
type Spacing = "default" | "flush";

const toneClass: Record<Tone, string> = {
  white: "",
  mist: "bg-mist",
  sand: "bg-sand",
};

/** Vertical rhythm: docs/spec/design-system.md § 3. */
function spacingClass(tone: Tone, spacing: Spacing) {
  if (tone === "white") return spacing === "default" ? "u-section-pt" : "";
  return spacing === "default" ? "u-section-mt u-section-py" : "u-section-py";
}

export default function Section({
  tone = "white",
  spacing = "default",
  id,
  className,
  children,
}: {
  tone?: Tone;
  spacing?: Spacing;
  /** Anchor target; adds the scroll offset that clears the sticky header. */
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        toneClass[tone],
        spacingClass(tone, spacing),
        id && "scroll-mt-[90px] lg:scroll-mt-[100px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
