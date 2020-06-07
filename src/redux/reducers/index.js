import { combineReducers } from 'redux';
import { getAsyncDataReducer } from './async';

export const StateProperty = {
  account: 'account',
  invitations: 'invitations',
  oauthApps: 'oauthApps',
  userProfile: 'userProfile',
  patients: 'patients',
  physicians: 'physicians',
  search: 'search',
  labs: 'labs',
  prescription: 'prescription',
};

const allAsyncReducers = Object.keys(StateProperty).reduce(
  (acc, stateProperty) => {
    acc[stateProperty] = getAsyncDataReducer(stateProperty);
    return acc;
  },
  {}
);

function rootReducer(state, action) {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }

  const appReducer = combineReducers(allAsyncReducers);
  return appReducer(state, action);
}

export default rootReducer;
