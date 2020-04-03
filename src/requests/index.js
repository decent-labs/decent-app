import { useState } from 'react';

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
  return new Promise((resolve, reject) => {
    return fetch(`${process.env.REACT_APP_API_URL}/${route}`, options)
      .then(response => {
        return processResponse(response)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
      .catch(error => reject(error.message));
  });
}

function processResponse(response) {
  return new Promise((resolve, reject) => {
    if (!response.ok) {
      return response.json()
        .then(error => reject(error.error));
    }
    return response.json()
      .then(response => resolve(response))
      .catch(error => reject(error.message));
  });
}

function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    return makeRequest('password', 'POST', basicHeaders, { email })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

function resetPassword(email, token, newPassword, twoFAToken) {
  return new Promise((resolve, reject) => {
    return makeRequest('password', 'PUT', basicHeaders, {
      email, token, newPassword, twoFAToken
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

const useFetch = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (path, method, body) => () => {
    const basicHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
    });

    const options = {
      method: method,
      headers: basicHeaders
    };

    if (body) options.body = JSON.stringify(body);
    if (isLoading) return;

    setIsLoading(true);
    setError(false);

    fetch(`${process.env.REACT_APP_API_URL}/${path}`, options)
      .then(response => {
        if (!response.ok) {
          response.json()
            .then(error => {
              setIsLoading(false);
              setError(error.error);
            })
            .catch(error => {
              setIsLoading(false);
              setError(error.message)
            })
        } else {
          response.json()
            .then(response => {
              setIsLoading(false);
              setFetchedData(response);
            })
            .catch(error => {
              setIsLoading(false);
              setError(error.message);
            });
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  return [sendRequest, isLoading, fetchedData, error];
}

export { useFetch, forgotPassword, resetPassword };
