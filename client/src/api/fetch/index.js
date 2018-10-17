import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import template from 'lodash/template';
import toFormData from './toFormData';
import { baseSelector } from '../../selectors/session';
import { locationSelector } from '../../selectors/router';
import { apiLoading, apiSuccess, apiFail } from '../../actions/loading';
import { logout } from '../../actions/logout';

// eslint-disable-next-line
const HOST = process.env.NODE_ENV === 'production' ? location.hostname : 'localhost';
const PORT = process.env.NODE_ENV === 'production' ? 80 : 8080;
const API_ENDPOINT = `http://${HOST}:${PORT}/api`;

const getBody = (res) => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  }
  if (!res.bodyUsed) return null;
  return res.text();
};

const fetchInternal = (headers, transformer, method, endpoint, dispatch, state) => (
  args,
  templateArgs,
) => {
  dispatch(apiLoading());
  const request = {
    method,
    headers,
    body: transformer(args),
  };
  return fetch(`${API_ENDPOINT}/${template(endpoint)(templateArgs)}`, request)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(logout());
          dispatch(push('/login', locationSelector(state)));
          // eslint-disable-next-line
          return Promise.reject({ title: 'ERROR.PERMISSION_DENIED' });
        }
        // if (res.bodyUsed) {
        // eslint-disable-next-line
        return res.text().then(x => Promise.reject({ title: x }));
        // }
        // eslint-disable-next-line
        // return Promise.reject({ title: res.statusText });
      }
      return getBody(res);
    })
    .then(
      (json) => {
        dispatch(apiSuccess());
        return json;
      },
      (error) => {
        dispatch(apiFail(error.title || 'ERROR.API_CONNECTION'));
        return Promise.reject(error);
      },
    );
};

const getJsonHeader = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const getBearerHeader = (state) => {
  const { tokenType, accessToken } = baseSelector(state);
  return { Authorization: `${tokenType} ${accessToken}` };
};

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

const apiClient = {
  get: executeRest('GET'),
  put: executeRest('PUT'),
  post: executeRest('POST'),
  delete: executeRest('DELETE'),
  login: executeLogin('POST'),
  file: executeUpload('POST'),
};

export default apiClient;
