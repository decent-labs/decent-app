const initialState = {
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
    labs: action.data.labs,
  };
}

function addData(state = initialState, action) {
  const newState = { ...state }
  newState.labs.data.splice(newState.labs.data.length, 0, action.data);
  return newState;
}

function updateData(state = initialState, action) {
  const newState = { ...state }
  const otherLabs = newState.labs.data.filter(l => l.id !== action.data.id)
  otherLabs.push(action.data)
  newState.labs.data = otherLabs;
  return newState;
}

export { initialState, setData, addData, updateData };
