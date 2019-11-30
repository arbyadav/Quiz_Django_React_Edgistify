import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (rest.isAuthenticated) {
        if (props.location.search !== "") {
          let redirectRoute = props.location.search.split("?next=")[1];
          return <Redirect to={redirectRoute} />;
        }
        return <Redirect to="/quizzes" />;
      }

      else {
        return <Component {...props} setAuthenticated={rest.setAuthenticated} />;
      }
    }}
  />
);
export default RedirectRoute;