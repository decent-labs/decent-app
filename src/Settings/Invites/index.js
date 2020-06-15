import React from 'react';
import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import {Table} from "react-bootstrap";

function Invites() {
  const invitations = useAsyncState(StateProperty.invitations);

  return (
    <>
      <div className='mb-4'>
        <h3>Outstanding Invites</h3>
        <Table>
          <thead>
            <tr>
              <th>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
          {invitations.data.map(invite => {
            return (
              <tr key={invite.email}>
                <td className='first-row-element last-row-element'>
                  {invite.email}
                </td>
              </tr>
          )
          })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Invites;
