import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  label: string;
  error?: string;
  adornment?: ReactNode;
}
