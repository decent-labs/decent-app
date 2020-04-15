import React from 'react';

import UpdateAccount from './UpdateAccount';
import UpdatePassword from './UpdatePassword';

function Account() {
  return (
    <>
      <UpdateAccount />
      <hr />
      <UpdatePassword />
    </>
  );
}

export default Account;
