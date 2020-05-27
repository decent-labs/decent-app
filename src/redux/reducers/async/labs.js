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

export { initialState, setData };
