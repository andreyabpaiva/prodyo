import { cn } from "@/lib/cn";
import type { CardProps } from "./types";

export default function Card({
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "bg-paper",
        interactive && "cursor-pointer transition-all",
        className,
      )}
    >
      {children}
    </div>
  );
}
