import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type {
  DrawerContextValue,
  DrawerKind,
  DrawerProviderProps,
  DrawerRequest,
  OpenDrawerOptions,
} from "./types";

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [request, setRequest] = useState<DrawerRequest | null>(null);

  const open = useCallback((kind: DrawerKind, options?: OpenDrawerOptions) => {
    setRequest({ kind, mode: options?.mode ?? "create", ...options });
  }, []);

  const close = useCallback(() => setRequest(null), []);

  const value = useMemo<DrawerContextValue>(
    () => ({ request, open, close }),
    [request, open, close],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
  return ctx;
}
