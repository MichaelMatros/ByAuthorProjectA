import { createBrowserRouter, redirect } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AppIndexPage from "@/pages/AppIndexPage";
import AuthIndexPage from "@/pages/AuthIndexPage";
import ErrorNotFoundPage from "@/pages/Error404Page";

export function useRoutes() {
  function isLoggedIn() {
    try {
      return !!JSON.parse(localStorage.getItem("login") ?? "");
    } catch {
      return false;
    }
  }
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      loader: () => {
        if (!isLoggedIn()) {
          return redirect("/auth/#signin");
        }

        return null;
      },
      children: [
        {
          index: true,
          element: <AppIndexPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthIndexPage />,
      loader: () => {
        if (isLoggedIn()) {
          return redirect("/");
        }

        return null;
      },
    },
    {
      path: "/*",
      element: <ErrorNotFoundPage />,
    },
  ]);
}
