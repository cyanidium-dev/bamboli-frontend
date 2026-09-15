"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Muted looping clip that loads nothing until it scrolls into view and
 * pauses again when it leaves — keeps reels off the PageSpeed budget.
 */
export default function InViewVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={cn("size-full object-cover", className)}
    />
  );
}
