import type { LogoSize } from "./types";

export const LOGO_SIZE: Record<LogoSize, { svg: number; text: string }> = {
  sm: { svg: 24, text: "text-lg" },
  md: { svg: 26, text: "text-lg" },
  lg: { svg: 30, text: "text-logo" },
};
