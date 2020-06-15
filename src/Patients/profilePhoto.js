import React from 'react';
import Jdenticon from 'react-jdenticon';

const ProfilePhoto = ({ firstName, lastName, userId, entityId, size = "50" }) => {
  if (firstName === undefined || lastName === undefined || userId === undefined || entityId === undefined)
    throw new Error("ProfilePhoto is missing a required parameter")

  return (
    <Jdenticon size={size} value={firstName + lastName + userId + entityId} />
  )
}

export default ProfilePhoto
