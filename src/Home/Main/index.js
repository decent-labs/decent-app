import React from 'react';

import { useFetchAccount } from '../../redux/actions/account';

function Main() {
  const account = useFetchAccount();

  return (
    <div>{account.email}</div>
  );
}

export default Main;
