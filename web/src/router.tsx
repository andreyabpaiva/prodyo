import { createBrowserRouter } from "react-router-dom";
import App from "@/app";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);
