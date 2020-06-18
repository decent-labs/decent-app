import {request} from "../../../requests";

const initialState = [];

function setData(_state = initialState, action) {
  return action.data.invitations;
}

function addData(state = initialState, action) {
  const newState = state.slice();
  newState.splice(state.length, 0, action.data);
  return newState;
}

function fetchInvitations() {
  return request('invitation/', 'GET')
}

export { initialState, setData, addData, fetchInvitations };
