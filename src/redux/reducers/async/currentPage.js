const initialState = {
  currentPage: '/'
};

function setData(state = initialState, action) {
  return {
    ...state,
    currentPage: action.data.currentPage || '/'
  };
}

export { initialState, setData };
