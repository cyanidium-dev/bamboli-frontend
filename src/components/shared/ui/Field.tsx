import { cn } from "@/lib/utils";

/**
 * on="color" — fields on mist/sand sections and cards: a light outline.
 * on="white" — fields on a white page: a stronger outline and ink label.
 */
type Surface = "color" | "white";

const controlBase =
  "w-full bg-surface text-[14px] px-4 py-3.5 outline-none transition placeholder:text-muted/70 focus:border-ink border";

/** Classes for the <input>, <select> or <textarea> placed inside <Field>. */
export function fieldControl({
  invalid,
  on = "color",
  className,
}: {
  invalid?: boolean;
  on?: Surface;
  className?: string;
} = {}) {
  return cn(
    controlBase,
    invalid ? "border-clay" : on === "white" ? "border-ink/40" : "border-line",
    className,
  );
}

/** Label + control + error message. */
export default function Field({
  label,
  error,
  on = "color",
  floatingError = false,
  className,
  children,
}: {
  label: string;
  error?: string;
  on?: Surface;
  /** Show the error out of flow, so it never shifts the fields below. */
  floatingError?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className={cn("u-label mb-2 block", on === "white" ? "text-ink" : "text-muted")}>
        {label}
      </span>
      {children}
      {error && (
        <span
          className={cn(
            "text-[11px] text-clay",
            floatingError ? "absolute left-0 top-full mt-1 leading-none" : "mt-1.5 block",
          )}
        >
          {error}
        </span>
      )}
    </label>
  );
}
