import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function UnauthedRoute({ children, ...rest }) {
  const [cookies] = useCookies(['token']);

  return (
    <Route
      {...rest}
      render={({ location }) => 
        !cookies.token ? (
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

export default UnauthedRoute;
