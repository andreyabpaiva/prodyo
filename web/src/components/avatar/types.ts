export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarTone = "brand" | "soft";

export interface AvatarProps {
  initial: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  className?: string;
}
