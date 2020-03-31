import React from 'react';
import { useCookies } from 'react-cookie';

import Auth from './Auth';
import Home from './Home';

function App() {
  let [cookies, setCookie] = useCookies(['token']);

  const authSuccess = response => {
    const expires = new Date();
    expires.setDate(expires.getDate() + parseInt(process.env.REACT_APP_TOKEN_COOKIE_EXPIRATION_DAYS, 10));
    setCookie('token', response.token, { expires });
  };

  [cookies] = useCookies(['token']);

  return (
    <>
      {!cookies.token ? <Auth authSuccess={authSuccess} /> : <Home />}
    </>
  );
}

export default App;
