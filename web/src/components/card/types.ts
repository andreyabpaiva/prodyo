import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}
