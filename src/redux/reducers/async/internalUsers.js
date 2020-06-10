const initialState = [];

function setData(_state = initialState, action) {
  return action.data.admins;
}

function addData(state = initialState, action) {
  const newState = state.slice();
  newState.splice(state.length, 0, action.data);
  return newState;
}

export { initialState, setData, addData };
