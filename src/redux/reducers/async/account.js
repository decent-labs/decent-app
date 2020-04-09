const initialState = {
  name: null,
  email: null
};

function accountSetData(state = initialState, action) {
  return {
    ...state,
    name: action.data.user.fullName,
    email: action.data.user.email
  };
}

export { accountSetData };
