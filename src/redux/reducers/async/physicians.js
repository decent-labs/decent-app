const initialState = {
  prescribers:[],
  pagination:{}
};

function setData(_state = initialState, action) {
  return action.data;
}

function addData(state = initialState, action) {
  const newState = state.slice();
  newState.splice(state.length, 0, action.data);
  return newState;
}

export { initialState, setData, addData };