import type { ButtonSize, ButtonTone, ButtonVariant } from "./types";

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed";

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "text-caption rounded-item px-3.25 py-1.5",
  md: "text-sm rounded-input px-4.5 py-2",
  lg: "text-cta rounded-input px-5.5 py-3.25",
};

export const BUTTON_VARIANT: Record<ButtonVariant, Record<ButtonTone, string>> =
  {
    solid: {
      brand: "bg-brand text-white hover:bg-brand-dark",
      bug: "bg-bug text-white hover:brightness-95",
      impro: "bg-impro text-white hover:brightness-95",
      neutral: "bg-espresso text-canvas hover:brightness-110",
    },
    soft: {
      brand: "bg-brand-light text-brand hover:brightness-95",
      bug: "bg-bug-bg text-bug hover:bg-bug-bg-hover",
      impro: "bg-impro-bg text-impro hover:bg-impro-bg-hover",
      neutral: "bg-shell text-stone hover:bg-shell-dark",
    },
    outline: {
      brand: "bg-transparent text-brand border border-ash hover:bg-brand-light",
      bug: "bg-transparent text-bug border border-bug/40 hover:bg-bug-bg",
      impro: "bg-transparent text-impro border border-impro/40 hover:bg-impro-bg",
      neutral: "bg-transparent text-stone border border-ash hover:bg-shell",
    },
    ghost: {
      brand: "bg-transparent text-brand hover:bg-brand-light",
      bug: "bg-transparent text-bug hover:bg-bug-bg",
      impro: "bg-transparent text-impro hover:bg-impro-bg",
      neutral: "bg-transparent text-stone hover:bg-shell",
    },
    pill: {
      brand:
        "bg-transparent text-brand border border-fog rounded-full hover:bg-brand-light",
      bug: "bg-transparent text-bug border border-fog rounded-full hover:bg-bug-bg",
      impro:
        "bg-transparent text-impro border border-fog rounded-full hover:bg-impro-bg",
      neutral:
        "bg-transparent text-stone border border-fog rounded-full hover:bg-shell",
    },
  };
