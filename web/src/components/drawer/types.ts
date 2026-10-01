import type { ReactNode } from "react";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  width?: number;
  onBack?: () => void;
  footer?: ReactNode;
  children: ReactNode;
}
