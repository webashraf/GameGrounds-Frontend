import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../../hooks/userHook";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TProtectedRoute = { children: ReactNode; role?: string };

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
 

  const user = useUser();

  if (role && (user as TUser)?.role !== role && role !== "admin") {
    return <Navigate to="/unauthorized" replace={true} />;
  }
  if (role && (user as TUser)?.role !== role) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
