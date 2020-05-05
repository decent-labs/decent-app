const initialState = [];

function setData(_state = initialState, action) {
  return action.data.patients;
}

export { initialState, setData };
