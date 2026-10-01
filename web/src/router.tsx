import { createBrowserRouter } from "react-router-dom";
import App from "@/app";
import AuthenticatedApp from "@/app/authenticated";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import ProjectsPage from "@/pages/projects";
import ProjectDetailPage from "@/pages/project-detail";
import IterationPage from "@/pages/iteration";

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
      {
        element: <AuthenticatedApp />,
        children: [
          {
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "projects/:projectId",
            element: <ProjectDetailPage />,
          },
          {
            path: "projects/:projectId/iterations/:iterationId",
            element: <IterationPage />,
          },
        ],
      },
    ],
  },
]);
