import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./utils/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        authTokens !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
