import type { LogoProps } from "./types";
import { LOGO_SIZE } from "./constants";

export default function Logo({ size = "lg", variant = "default" }: LogoProps) {
  const { svg, text } = LOGO_SIZE[size];

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={svg}
        height={svg}
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="30"
          height="30"
          rx="8"
          className={variant === "white" ? "fill-white/20" : "fill-brand"}
        />
        <rect x="9" y="8" width="4" height="14" rx="2" className="fill-white" />
        <rect x="9" y="8" width="12" height="4" rx="2" className="fill-white" />
        <rect
          x="9"
          y="15"
          width="10"
          height="4"
          rx="2"
          className="fill-white"
        />
        <rect
          x="17"
          y="8"
          width="4"
          height="11"
          rx="2"
          className="fill-white"
        />
      </svg>
      <span
        className={`font-lora font-semibold tracking-tight ${text} ${
          variant === "white" ? "text-white" : "text-espresso"
        }`}
      >
        prodyo
      </span>
    </div>
  );
}
