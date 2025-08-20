import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
