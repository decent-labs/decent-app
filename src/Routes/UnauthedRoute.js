import React from 'react';

import { Route, Redirect, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

function UnauthedRoute({ children, ...rest }) {
  const [cookies, , removeCookie] = useCookies(['token']);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  
  if (pathname.startsWith("/auth/invite/")) {  
    removeCookie('token', { path: '/' })
    removeCookie('currentProfile', { path: '/' });
    dispatch({ type: 'RESET_APP' });
  }
  
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
