import React from "react";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, auth, loading, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!rest.isAuthenticated) {
          if (props.location.pathname === "/account/logout") {
            return <Redirect to="/" />;
          } else {
            return (
              <Redirect to={`/?next=${props.location.pathname}`} />
            );
          }
        } else {
          return <Component {...props} token={rest.token} />;
        }
      }
      }
    />
  );
}

export default PrivateRoute;