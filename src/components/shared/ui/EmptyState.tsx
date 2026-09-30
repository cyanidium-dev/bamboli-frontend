import { cn } from "@/lib/utils";

/**
 * Empty or confirmation state: cart, favourites, search without results,
 * empty checkout, 404, order accepted. Same rhythm everywhere: title, text
 * 20px below, action 36px below. Pass as="h1" when it is the page's own
 * heading; otherwise the title is a paragraph.
 */
export default function EmptyState({
  eyebrow,
  title,
  text,
  action,
  as = "p",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: React.ReactNode;
  action?: React.ReactNode;
  as?: "h1" | "p";
  className?: string;
}) {
  const Title = as;

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow && <p className="u-label mb-5 text-muted">{eyebrow}</p>}
      <Title className={as === "h1" ? "u-h1" : "u-state-title"}>{title}</Title>
      {text && <p className="u-body mt-5 max-w-[380px]">{text}</p>}
      {action && <div className="mt-9">{action}</div>}
    </div>
  );
}
