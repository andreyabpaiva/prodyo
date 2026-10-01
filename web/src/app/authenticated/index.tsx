import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusScreen from "@/components/status-screen";
import { DrawerProvider } from "@/contexts/drawer";
import { SessionProvider } from "@/contexts/session";
import { useMe } from "@/services/queries/auth/use-me";
import AppDrawer from "@/views/drawer";

export default function AuthenticatedApp() {
  const { t } = useTranslation();
  const me = useMe();

  if (me.isPending) return <StatusScreen message={t("common.loading")} />;
  if (me.isError) return <Navigate to="/auth" replace />;

  return (
    <SessionProvider user={me.data}>
      <DrawerProvider>
        <Outlet />
        <AppDrawer />
      </DrawerProvider>
    </SessionProvider>
  );
}
