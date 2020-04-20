import React from 'react';

import { Route, Redirect } from 'react-router-dom';

function RouteRule({ rule, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => 
        rule ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location.pathname }
            }}
          />
        )
      }
    />
  );
}

export default RouteRule;
