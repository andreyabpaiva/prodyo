import { createContext, useContext, useMemo } from "react";
import type { SessionContextValue, SessionProviderProps } from "./types";

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ user, children }: SessionProviderProps) {
  const value = useMemo<SessionContextValue>(() => ({ user }), [user]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
