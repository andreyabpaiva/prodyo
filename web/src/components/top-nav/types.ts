import type { ReactNode } from "react";

export interface TopNavProps {
  center?: ReactNode;
  userName: string;
  onLogoClick?: () => void;
  onProfile: () => void;
  onLogout?: () => void;
}
