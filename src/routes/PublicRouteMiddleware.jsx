import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { get } from "services/localstorage";

const PublicRouteMiddleware = ({
  component: Component,
  checkCondition,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        return false ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRouteMiddleware;
