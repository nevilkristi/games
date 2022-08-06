import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteMiddleware = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        return true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRouteMiddleware;
