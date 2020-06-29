import { Cookies } from 'react-cookie';

const request = (path, method, body) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
  });

  const cookie = new Cookies();
  const token = cookie.get('token');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  return new Promise((resolve, reject) => {
    return fetch(`${process.env.REACT_APP_API_URL}/${path}`, options)
      .then(response => {
        if (!response.ok) {
          response.json()
            .then(errorResponse => {
              if (token && errorResponse.error.indexOf('not logged in') > -1){
                cookie.remove("token");
                window.location="/";
              }
              return errorResponse;
            })
            .then(error => reject(error.error))
            .catch(error => reject(error.message));
        } else {
          response.json()
            .then(response => resolve(response))
            .catch(error => reject(error.message));
        }
      })
      .catch(error => reject(error.message));
  });
}

export { request } ;
