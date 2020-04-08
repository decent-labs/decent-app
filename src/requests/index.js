import { useState } from 'react';

const useFetch = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (path, method, body) => {
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

export { useFetch };
