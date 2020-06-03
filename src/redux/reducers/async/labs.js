const initialState = {
  currentLab: {},
  labs: {
	data: [],
	pagination: {
	    from: 0,
	    to: 0
	}
    },
};

function setData(state = initialState, action) {
  return {
    ...state,
    currentLab: action.data.currentLab,
    labs: action.data.labs,
  };
}

function addData(state = initialState, action) {
  const newState = state;
  newState.labs.data.splice(newState.labs.data.length, 0, action.data);
  return newState;
}

export { initialState, setData, addData };
