import React from 'react';
import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import {Table} from "react-bootstrap";

function Invites() {
  const invitations = useAsyncState(StateProperty.invitations);

  return (
    <>
      <div className='mb-4'>
        <h3>Invitations</h3>

        {invitations.length > 0 ?
          <>
            <p>Pending invitations that have not yet been accepted.</p>
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
          </>
        : <h4>There are no pending invitations</h4>
        }
      </div>
    </>
  );
}

export default Invites;
