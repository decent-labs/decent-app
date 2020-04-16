import React, { useCallback } from 'react';

import Table from 'react-bootstrap/Table';

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';

import { request } from '../../requests';

function List() {
  const profiles = useAsyncState(StateProperty.userProfile);
  const oauthAppsLoader = useCallback(() =>
    request(`hospitalOrgs/${profiles.data.currentProfile.profileId}/oauthApplications`, 'GET'),
    []);
  const oauthApps = useAsyncState(StateProperty.oauthApps, oauthAppsLoader);

  const appRows = oauthApps.data.map((app, index) => (
    <tr key={index}>
      <td>{app.name}</td>
      <td>{app.redirectURI}</td>
      <td>{app.clientId}</td>
      <td>{app.clientSecret}</td>
    </tr>
  ))

  return (
    <>
      <h3>OAuth Applications</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Redirect URI</th>
            <th>Client ID</th>
            <th>Client Secret</th>
          </tr>
        </thead>
        <tbody>
          {appRows}
        </tbody>
      </Table>
    </>
  );
}

export default List;
