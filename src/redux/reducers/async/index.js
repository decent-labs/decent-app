const LOADING = stateProperty => `${stateProperty}/loading`;
const SET_DATA = stateProperty => `${stateProperty}/setData`;
const ERROR = stateProperty => `${stateProperty}/error`;

export const dataLoadingAction = stateProperty => ({
  data: {},
  type: LOADING(stateProperty)
});

export const dataUpdateAction = (stateProperty, data) => ({
  data,
  type: SET_DATA(stateProperty)
});

export const dataLoadingErrorAction = (stateProperty, error) => ({
  data: error,
  type: ERROR(stateProperty)
});

export const getAsyncDataReducer = stateProperty => {
  const initialState = {
    isLoading: false,
    error: null,
    isStale: false,
    data: {}
  };

  let specificReducerModule = null;
  let setDataReducer = null;
  let specificInitialState = null;
  
  try {
    specificReducerModule = require(`./${stateProperty}`);
    setDataReducer = specificReducerModule[`${stateProperty}SetData`];
    specificInitialState = specificReducerModule['initialState'];
  } catch(error) {
    // swallow
    console.log(`couldn't find a specific module or exported function for ${stateProperty} reducer`)
  }

  if (specificInitialState) initialState.data = specificInitialState;

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING(stateProperty):
        return {
          ...state,
          isLoading: true,
          isStale: true,
          error: null
        };
      case SET_DATA(stateProperty):
        return {
          ...state,
          isLoading: false,
          isStale: false,
          error: null,
          data: setDataReducer ? setDataReducer(state.data, action) : action.data
        };
      case ERROR(stateProperty):
        return {
          ...state,
          isLoading: false,
          error: action.data
        };
      default:
        return state;
    }
  };

  return reducer;
};
