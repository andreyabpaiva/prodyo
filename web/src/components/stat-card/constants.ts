import type { StatCardSize, StatCardTone } from "./types";

export const STAT_CARD_TONE: Record<StatCardTone, string> = {
  default: "text-espresso",
  bug: "text-bug",
  impro: "text-impro",
};

export const STAT_CARD_SIZE: Record<
  StatCardSize,
  { container: string; value: string }
> = {
  sm: { container: "px-3.5 py-2", value: "text-[1.0625rem]" },
  md: { container: "px-4 py-3.5", value: "text-xl" },
};
