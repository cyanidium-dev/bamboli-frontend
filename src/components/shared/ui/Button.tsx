import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outline" | "outline-light" | "light" | "text-link";
type Size = "md" | "sm";

type BaseProps = {
  /** filled — main CTA; outline — secondary; outline-light / light — on dark backgrounds and photos; text-link — underlined. */
  variant?: Variant;
  /** Ignored by text-link. */
  size?: Size;
  fullWidth?: boolean;
  /** Disables the button and marks it busy (form submit in flight). */
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type LinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href"> & {
    href: string;
  };

const variantClass: Record<Variant, string> = {
  filled:
    "inline-flex items-center justify-center gap-2 border border-ink bg-ink text-bg hover:bg-transparent hover:text-ink",
  outline:
    "inline-flex items-center justify-center gap-2 border border-ink/25 hover:border-ink",
  "outline-light":
    "inline-flex items-center justify-center gap-2 border border-bg hover:bg-bg hover:text-ink",
  light:
    "inline-flex items-center justify-center gap-2 border border-white bg-white text-ink hover:bg-transparent hover:text-white",
  "text-link": "inline-block border-b border-ink pb-1 hover:opacity-60",
};

const sizeClass: Record<Size, string> = {
  md: "px-7 py-4",
  sm: "px-6 py-3.5",
};

const external = /^(https?:|tel:|mailto:)/;

/**
 * The only place button styling lives. Outer spacing (mt-*) belongs to the
 * parent, not to the button.
 */
export default function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "filled",
    size = "md",
    fullWidth,
    loading,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "u-label transition duration-(--duration-fast) disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    variant !== "text-link" && sizeClass[size],
    fullWidth && "w-full",
    loading && "cursor-progress",
    className,
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<LinkProps, keyof BaseProps>;

    if (external.test(href)) {
      const isWeb = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-busy={loading || undefined}
      {...(rest as Omit<ButtonProps, keyof BaseProps>)}
      disabled={loading || (rest as ButtonProps).disabled}
    >
      {children}
    </button>
  );
}
