import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAccountAuthetication } from "../../store";
export const PrivateRoutes = () => {
  let auth = useAccountAuthetication((state) => state.isAdmin);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
