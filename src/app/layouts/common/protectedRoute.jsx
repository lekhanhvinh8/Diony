import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";
import { roleNames } from "../../../config.json";

const ProtectedRoute = ({ path, role, ...rest }) => {
  const user = auth.getCurrentUser();
  if (user && user.role === role) return <Route path={path} {...rest} />;

  return (
    <Route
      render={(props) => (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )}
    />
  );
};

export default ProtectedRoute;
