const initialState = {
  patients:[],
  pagination: {}
};

function setData(_state = initialState, action) {
  return action.data;
}

function addData(state = initialState, action) {
  const newPatientState = state.patients.slice();
  newPatientState.splice(state.patients.length, 0, action.data);
  return {
      patients: newPatientState,
      pagination: {}
  };
}

export { initialState, setData, addData };
