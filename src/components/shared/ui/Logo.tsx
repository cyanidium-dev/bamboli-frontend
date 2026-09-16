import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/bamboli-logo.svg"
      alt="Bamboli"
      width={730}
      height={189}
      priority
      className={cn("h-auto w-[130px] lg:w-[150px]", className)}
    />
  );
}
