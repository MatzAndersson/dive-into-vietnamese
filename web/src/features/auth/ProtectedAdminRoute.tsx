import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./api";

export function ProtectedAdminRoute() {
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        Checking login status...
      </main>
    );
  }

  if (isError || !data?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!data.canManageLessons) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Access denied</h1>
        <p className="mt-2">
          You are logged in, but your account does not have permission to manage lessons.
        </p>
      </main>
    );
  }

  return <Outlet />;
}