const initialState = {
  patients: []
};

function setData(state = initialState, action) {
  return {
    ...state,
    patients: action.data
  };
}

export { initialState, setData };
