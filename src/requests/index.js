const basicHeaders = new Headers({
  'Content-Type': 'application/json',
  'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
});

function makeRequest(route, method, headers, body = null) {
  const options = {
    method: method,
    headers: headers
  };
  if (body) options.body = JSON.stringify(body);
  return fetch(`${process.env.REACT_APP_API_URL}/${route}`, options);
}

function processResponse(response) {
  return new Promise((resolve, reject) => {
    if (!response.ok) {
      return response.json().then(error => {
        reject(error.error);
      });
    }
    return response.json().then(response => {
      resolve(response);
    }).catch(error => {
      reject(error.message);
    });
  });
}

function login(email, password, token) {
  return new Promise((resolve, reject) => {
    return makeRequest('auth/login', 'POST', basicHeaders, { email, password, token })
      .then(response => processResponse(response))
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

export { login };
