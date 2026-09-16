interface IconProps {
  className?: string;
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M3.6 6.4h12.8l-.9 10.2a1.4 1.4 0 0 1-1.4 1.3H5.9a1.4 1.4 0 0 1-1.4-1.3L3.6 6.4Z" />
      <path d="M7.2 8.2V5.4a2.8 2.8 0 0 1 5.6 0v2.8" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M10 16.5S3.2 12.6 3.2 8.2a3.4 3.4 0 0 1 6.8-1 3.4 3.4 0 0 1 6.8 1c0 4.4-6.8 8.3-6.8 8.3Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <circle cx="9" cy="9" r="5.4" />
      <path d="m13.2 13.2 3.4 3.4" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M3 6h14M3 10h14M3 14h9" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M10 4.5v11M4.5 10h11" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M4.5 10h11" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="m6 8 4 4 4-4" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M7 4.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L7.9 4.3a.6.6 0 0 0-.9.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4" />
      <circle cx="10" cy="10" r="3.2" />
      <circle cx="14.2" cy="5.8" r=".5" fill="currentColor" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M17 3.8 2.8 9.3l4.6 1.6 1.6 4.9 2.6-3.1 3.7 2.8L17 3.8Z" />
      <path d="m7.4 10.9 7.2-5" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5.6 3.4 8 4.2c.4.14.62.58.5.98l-.72 2.1a.9.9 0 0 1-.42.48c-.62.32-1.04 1.02-.7 1.68a8.2 8.2 0 0 0 4 4c.66.34 1.36-.08 1.68-.7a.9.9 0 0 1 .48-.42l2.1-.72c.4-.12.84.1.98.5l.8 2.4a1 1 0 0 1-.5 1.22c-.66.34-1.6.76-2.42.76-2.9 0-8.86-2.66-11.5-8.5-.5-1.1-.42-2.6-.06-3.42.24-.56.76-1.16 1.18-1.4.36-.2.8-.24 1.18-.18Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2.8" y="4.8" width="14.4" height="10.4" rx="1.6" />
      <path d="m3.4 5.6 6.6 5 6.6-5" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M10 3.4c3.2 0 5.6 1.7 5.6 5.4v2.4c0 3.2-2.2 5.4-5.4 5.4-2.5 0-4.4-1.2-4.4-3.3 0-2 1.8-3 4.1-3 1.4 0 2.6.32 3.5.82" />
      <path d="M12.2 8.2c0-1.3-.9-2.1-2.3-2.1-1.5 0-2.6.9-2.9 2.2" />
    </svg>
  );
}
