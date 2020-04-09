// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { useFetch } from '../../requests';
// import {
//   ACCOUNT_REQUEST,
//   ACCOUNT_RECEIVE,
//   ACCOUNT_ERROR
// } from '../actionTypes/account';

// function accountRequest() {
//   return { 
//     type: ACCOUNT_REQUEST
//   }
// };

// function accountReceive(response) {
//   return { 
//     type: ACCOUNT_RECEIVE,
//     payload: {
//       name: response.user.fullName,
//       email: response.user.email
//     }
//   }
// }

// function accountError(error) {
//   return {
//     type: ACCOUNT_ERROR,
//     payload: { error }
//   }
// }

// function useFetchAccount() {
//   const account = useSelector(state => state.account);
//   const dispatch = useDispatch();
  
//   const [sendRequest, fetchedData, error] = useFetch();

//   useEffect(() => {
//     if (!shouldFetchAccount(account)) return;
//     dispatch(accountRequest());
//     sendRequest('auth/me', 'GET');
//   }, [dispatch, account, sendRequest]);

//   useEffect(() => {
//     if (fetchedData) dispatch(accountReceive(fetchedData));
//     if (error) dispatch(accountError(error));
//   }, [dispatch, fetchedData, error]);

//   return account;
// }

// function shouldFetchAccount(account) {
//   if (account.isFetching) return false;
//   if (account.error) return false;
//   if (account.email) return false;
//   return true;
// }

// export { useFetchAccount };
