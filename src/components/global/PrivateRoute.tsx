// src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth/useAuth";
import { Spinner } from "@/components/ui/spinner";

export default function PrivateRoute() {
  const { token } = useAuth();
  const location = useLocation();

  // ① Still refreshing → show a spinner
  if (token === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Spinner />
      </div>
    );
  }

  // ② Not authenticated → redirect to /login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // ③ Authenticated → render children of this route
  return <Outlet />;
}
