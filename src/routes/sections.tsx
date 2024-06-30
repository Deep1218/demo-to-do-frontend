import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

export const LoginPage = lazy(() => import("../pages/Login"));
export const SignupPage = lazy(() => import("../pages/Signup"));
export const HomePage = lazy(() => import("../pages/home"));

export default function Router() {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/home", element: <HomePage /> },
  ]);
  return routes;
}
