import { cn } from "@/lib/cn";
import { AVATAR_SIZE, AVATAR_TONE } from "./constants";
import type { AvatarProps } from "./types";

export default function Avatar({
  initial,
  size = "md",
  tone = "brand",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold flex-shrink-0",
        AVATAR_SIZE[size],
        AVATAR_TONE[tone],
        className,
      )}
    >
      {initial}
    </div>
  );
}
