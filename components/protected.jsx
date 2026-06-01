import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Protected({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 16 }}>loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
}