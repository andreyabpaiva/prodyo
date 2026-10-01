import type { ReactNode } from "react";
import type { AuthUser } from "@/services/requests/auth/types";

export interface SessionContextValue {
  user: AuthUser;
}

export interface SessionProviderProps {
  user: AuthUser;
  children: ReactNode;
}
