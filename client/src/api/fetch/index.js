import fetch from 'isomorphic-fetch';
import toFormData from './toFormData';

// eslint-disable-next-line
const HOST = process.env.NODE_ENV === 'production' ? location.hostname : 'localhost';
const PORT = process.env.NODE_ENV === 'production' ? 80 : 8080;
const API_ENDPOINT = `http://${HOST}:${PORT}/api`;

const accessToken = 'token';

const getBody = (res) => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  }
  if (!res.bodyUsed) return null;
  return res.text();
};

const fetchInternal = (headers, transformer, method, endpoint) => args => fetch(`${API_ENDPOINT}/${endpoint}`, {
  method,
  headers,
  body: transformer(args),
})
  .then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        // dispatch(logout());
        // dispatch(push('/login', locationSelector(getState())));
        // eslint-disable-next-line
          return Promise.reject({ title: 'ERROR.PERMISSION_DENIED' });
      }
      // if (res.bodyUsed) {
      // eslint-disable-next-line
        //   return res.text().then(x => Promise.reject({ title: x }));
      // }
      // eslint-disable-next-line
        // return Promise.reject({ title: res.statusText });
    }
    return getBody(res);
  })
  .then(
    json => json,
    error => Promise.reject(error),
  );

const getJsonHeader = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const getBearerHeader = () => ({
  Authorization: `Bearer ${accessToken}`,
});

const mergeHeaders = (headers, state) => headers.reduce(
  (p, c) => ({
    ...p,
    ...c(state),
  }),
  {},
);

const jsonTransformer = obj => JSON.stringify(obj);

const execute = (...headers) => transformer => method => endpoint => (dispatch, getState) => {
  const state = getState();
  const mergedHeaders = mergeHeaders(headers, state);
  return fetchInternal(mergedHeaders, transformer, method, endpoint, dispatch, state);
};

const executeRest = execute(getJsonHeader, getBearerHeader)(jsonTransformer);
const executeLogin = execute(getJsonHeader)(jsonTransformer);
const executeUpload = execute(getBearerHeader)(toFormData);

export default {
  get: executeRest('GET'),
  put: executeRest('PUT'),
  post: executeRest('POST'),
  delete: executeRest('DELETE'),
  login: executeLogin('POST'),
  file: executeUpload('POST'),
};
