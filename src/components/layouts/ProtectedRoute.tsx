import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../../Redux/feature/authSlice";
import { useAppSelector } from "../../Redux/hook";
import { verifyToken } from "../../utils/verifyToken";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TProtectedRoute = { children: ReactNode; role?: string };

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  console.log(user);

  console.log({ token, user });

  if (role && (user as TUser)?.role !== role) {
    return <Navigate to="/sign-in" replace={true} />;
  }
  // if ((user as TUser)?.role === "admin") {
  //   return <Navigate to="/admin" replace={true} />;
  // }

  return children;
};

export default ProtectedRoute;
