const initialState = {
  message: ''
};

function setData(_state = initialState, action) {
  return action.data;
}

export { initialState, setData };
