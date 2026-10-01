import { cn } from "@/lib/cn";
import { BUTTON_BASE, BUTTON_SIZE, BUTTON_VARIANT } from "./constants";
import type { ButtonProps } from "./types";

export default function Button({
  variant = "solid",
  tone = "brand",
  size = "md",
  block = false,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(
        BUTTON_BASE,
        BUTTON_SIZE[size],
        BUTTON_VARIANT[variant][tone],
        block && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}
