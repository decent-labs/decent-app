const initialState = {
  currentProfile: {},
  profiles: []
};

function setData(state = initialState, action) {
  return {
    ...state,
    currentProfile: action.data.currentProfile || {},
    profiles: action.data.profiles
  };
}

export { initialState, setData };
