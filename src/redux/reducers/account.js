import { 
  ACCOUNT_REQUEST,
  ACCOUNT_RECEIVE,
  ACCOUNT_ERROR
} from '../actionTypes/account';

const initialState = {
  isFetching: false,
  error: null,
  name: null,
  email: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case ACCOUNT_RECEIVE: {
      const { name, email } = action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        name, email
      });
    }
    case ACCOUNT_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        error
      })
    }
    default:
      return state;
  }
}
