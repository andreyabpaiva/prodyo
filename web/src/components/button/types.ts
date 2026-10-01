import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost" | "pill";
export type ButtonTone = "brand" | "bug" | "impro" | "neutral";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
  children: ReactNode;
}
