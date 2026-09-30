import { cn } from "@/lib/utils";
import Container from "./Container";

/**
 * Wrapper of an inner page's content: the container plus the standard
 * vertical padding (40 / 56px above, section padding below).
 *
 * bottom={false} for pages that end with a full-width Section: that section
 * brings its own spacing, so the page adds none underneath.
 */
export default function Page({
  bottom = true,
  className,
  children,
}: {
  bottom?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className={cn("pt-10 lg:pt-14", bottom && "u-section-pb", className)}>
      {children}
    </Container>
  );
}
