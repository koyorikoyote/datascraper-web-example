import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth/useAuth";
import { Spinner } from "@/components/ui/spinner";

interface RoleRouteProps {
  allowedRoles: string[];
}

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return (
    <div className="flex h-full items-center justify-center p-6">
      <Spinner />
    </div>
  );

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.includes(user.role?.role_name || "");

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
