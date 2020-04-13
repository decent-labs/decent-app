import React from 'react';

import UpdateAccount from './UpdateAccount';
import UpdatePassword from './UpdatePassword';

function Settings() {
  return (
    <>
      <h1>My Account</h1>
      <UpdateAccount />
      <hr />
      <UpdatePassword />
    </>
  );
}

export default Settings;
