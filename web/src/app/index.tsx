import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "@/components/page-transition";

export default function App() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Outlet />
    </PageTransition>
  );
}
