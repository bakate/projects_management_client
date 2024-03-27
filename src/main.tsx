import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { getAuthenticatedUser } from "./actions/auth.actions.ts";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import AuthenticationPage from "./routes/auth/auth.tsx";
import LoginForm from "./routes/auth/components/login-form.tsx";
import SignUpForm from "./routes/auth/components/signup-form.tsx";
import PrivacyPage from "./routes/auth/privacy.tsx";
import TermsPage from "./routes/auth/terms.tsx";
import ProjectsList from "./routes/projects/projects-list.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
    errorElement: <ErrorPage />,
    loader: () => getAuthenticatedUser(),
  },
  {
    path: "auth",
    element: <AuthenticationPage />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignUpForm />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" closeButton richColors />
  </React.StrictMode>
);
