import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, status } = useAppSelector((state: RootState) => state.auth);

  if (status === "loading") {
    return <div>Loading ... </div>;
  }

  if (user === null && (status === "succeeded" || status === "failed")) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
