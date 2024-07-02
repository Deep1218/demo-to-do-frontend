import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

export const LoginPage = lazy(() => import("../pages/Login"));
export const SignupPage = lazy(() => import("../pages/Signup"));
export const HomePage = lazy(() => import("../pages/Home"));

export default function Router() {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/*", element: <Navigate to="/login" /> },
  ]);
  return routes;
}
