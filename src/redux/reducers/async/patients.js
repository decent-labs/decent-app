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

function updateData(state = initialState, action) {
  const newState = { ...state }
  const currentPatient = newState.patients.find(p => p.id === action.data.id)
  const otherPatients = newState.patients.filter(p => p.id !== action.data.id)
  otherPatients.push({ ...currentPatient, ...action.data })
  newState.patients = otherPatients;
  return newState;
}

export { initialState, setData, addData, updateData };
