import { useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';

const useFetch = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['token']);

  const sendRequest = useCallback((path, method, body) => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
    });

    if (cookies.token) {
      headers.set('Authorization', `Bearer ${cookies.token}`);
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

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
  }, [cookies.token])

  return [sendRequest, fetchedData, error, isLoading];
}

export { useFetch };
