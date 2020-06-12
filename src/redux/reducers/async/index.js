const LOADING = stateProperty => `${stateProperty}/loading`;
const SET_DATA = stateProperty => `${stateProperty}/setData`;
const ADD_DATA = stateProperty => `${stateProperty}/addData`;
const UPDATE_DATA = stateProperty => `${stateProperty}/updateData`;
const ERROR = stateProperty => `${stateProperty}/error`;

export const dataLoadingAction = stateProperty => ({
  data: {},
  type: LOADING(stateProperty)
});

export const dataSetAction = (stateProperty, data) => ({
  data,
  type: SET_DATA(stateProperty)
});

export const dataAddAction = (stateProperty, data) => ({
  data,
  type: ADD_DATA(stateProperty)
});

export const dataUpdateAction = (stateProperty, data) => ({
  data,
  type: UPDATE_DATA(stateProperty)
})

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
  let specificInitialState = null;
  let specificSetDataReducer = null;
  let specificAddDataReducer = null;
  let specificUpdateDataReducer = null;

  try {
    specificReducerModule = require(`./${stateProperty}`);
    specificInitialState = specificReducerModule['initialState'];
    specificSetDataReducer = specificReducerModule['setData'];
    specificAddDataReducer = specificReducerModule['addData'];
    specificUpdateDataReducer = specificReducerModule['updateData'];
  } catch (error) {
    // swallow
    console.log(`couldn't find a specific module or exported functions for ${stateProperty} reducer`)
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
          data: specificSetDataReducer ? specificSetDataReducer(state.data, action) : action.data
        };
      case ADD_DATA(stateProperty):
        return {
          ...state,
          isLoading: false,
          isStale: false,
          error: null,
          data: specificAddDataReducer ? specificAddDataReducer(state.data, action) : action.data
        };
      case UPDATE_DATA(stateProperty):
        return {
          ...state,
          isLoading: false,
          isStale: false,
          error: null,
          data: specificUpdateDataReducer ? specificUpdateDataReducer(state.data, action) : action.data
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
