import { cloneElement, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * on="color" — fields on mist/sand sections and cards: a light outline.
 * on="white" — fields on a white page: a stronger outline and ink label.
 */
type Surface = "color" | "white";

const controlBase =
  "w-full bg-surface text-[14px] px-4 py-3.5 outline-none transition placeholder:text-muted/70 focus:border-ink disabled:opacity-50 border";

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

/**
 * Label + control + error message. The error sits outside the label and is
 * tied to the control with aria-describedby, so screen readers announce it
 * without folding it into the field's name.
 */
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
  /** A single <input>, <select> or <textarea> element. */
  children: React.ReactElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>;
}) {
  const errorId = `${useId()}-error`;

  return (
    <div className={cn("relative", className)}>
      <label className="block">
        <span className={cn("u-label mb-2 block", on === "white" ? "text-ink" : "text-muted")}>
          {label}
        </span>
        {cloneElement(children, {
          "aria-describedby": error ? errorId : undefined,
          "aria-invalid": error ? true : undefined,
        })}
      </label>
      {error && (
        <span
          id={errorId}
          role="alert"
          className={cn(
            "text-[11px] text-clay",
            floatingError ? "absolute left-0 top-full mt-1 leading-none" : "mt-1.5 block",
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
}
