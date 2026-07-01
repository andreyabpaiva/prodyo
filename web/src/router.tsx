import { createBrowserRouter } from "react-router-dom";
import App from "@/app";
import LandingPage from "@/pages/landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);
