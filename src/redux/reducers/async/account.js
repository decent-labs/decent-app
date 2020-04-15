const initialState = {
  name: "Hello!",
  email: null
};

function setData(state = initialState, action) {
  return {
    ...state,
    name: action.data.user.fullName,
    email: action.data.user.email
  };
}

export { initialState, setData };
