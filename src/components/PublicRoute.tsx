import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks.ts";

interface PublicRouteProps {
  children: ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const authState = useAppSelector((state) => state.auth.status);

  if (authState === "authenticated") {
    return <Navigate to="/hierarchy" replace />;
  }

  return children;
}

export default PublicRoute;
