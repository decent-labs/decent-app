import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PrivateRoute({ children, ...rest }) {
  const [cookies] = useCookies(['token']);

  return (
    <Route
      {...rest}
      render={({ location }) => 
        cookies.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location.pathname }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;