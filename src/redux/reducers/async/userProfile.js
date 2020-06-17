import {request} from "../../../requests";

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

function fetchUserProfiles(){
  return request('auth/profiles', 'GET')
    .then((response) => {
      return {
        profiles: response.profiles
      }
    })
}
export { initialState, setData, fetchUserProfiles };
