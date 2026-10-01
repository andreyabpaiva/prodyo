import type { AvatarSize, AvatarTone } from "./types";

export const AVATAR_SIZE: Record<AvatarSize, string> = {
  xs: "w-5.5 h-5.5 text-micro",
  sm: "w-7 h-7 text-caption",
  md: "w-8 h-8 text-fine",
  lg: "w-[2.125rem] h-[2.125rem] text-fine",
  xl: "w-13 h-13 text-xl",
};

export const AVATAR_TONE: Record<AvatarTone, string> = {
  brand: "bg-brand text-white",
  soft: "bg-brand-light text-brand",
};
