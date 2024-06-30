import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

export const LoginPage = lazy(() => import("../pages/Login"));
export const HomePage = lazy(() => import("../pages/home"));

export default function Router() {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    { path: "/home", element: <HomePage /> },
  ]);
}
