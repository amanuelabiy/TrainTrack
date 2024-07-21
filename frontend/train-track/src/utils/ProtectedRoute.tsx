import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, status } = useAppSelector((state: RootState) => state.auth);

  if (status === "loading") return <div>loading...</div>;

  if (!user && status !== "loading") {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
