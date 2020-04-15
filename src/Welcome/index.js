import React from 'react';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Welcome() {
  const userProfile = useAsyncState(StateProperty.userProfile);

  return (
    <div>Welcome {userProfile.data.currentProfile.profileType}</div>
  );
}

export default Welcome;
