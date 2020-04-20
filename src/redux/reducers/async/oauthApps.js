const initialState = [];

function setData(state = initialState, action) {
  const apps = [];
  
  action.data.oauthApplications.forEach(app => {
    apps.push({
      name: app.name,
      redirectURI: app.redirectURI,
      clientId: app.id,
      clientSecret: app.secret
    });
  });

  return apps;
}

function addData(state = initialState, action) {
  const newApp = {
    name: action.data.applicationInfo.name,
    redirectURI: action.data.applicationInfo.redirectURI,
    clientId: action.data.applicationInfo.id,
    clientSecret: action.data.applicationInfo.secret
  }

  const newState = state.slice();
  newState.splice(state.length, 0, newApp);
  return newState;
}

export { initialState, setData, addData };
