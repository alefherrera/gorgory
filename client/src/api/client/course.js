import fetch from '../fetch';

export default {
  getAll: fetch.get('course'),
  // eslint-disable-next-line
  subscribe: fetch.put('course/${id}/subscribe'),
  // eslint-disable-next-line
  unsubscribe: fetch.put('course/${id}/unsubscribe'),
};
