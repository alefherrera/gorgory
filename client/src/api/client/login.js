import fetch from '../fetch';

export default {
  login: fetch.login('auth/login'),
  // refresh: fetch.post('auth/refresh'),
};
