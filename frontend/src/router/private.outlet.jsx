import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../auth/use-auth";

export default function PrivateOutlet() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
