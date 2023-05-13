import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loading, loggedIn } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
