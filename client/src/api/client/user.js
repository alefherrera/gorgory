import fetch from '../fetch';

export default {
  add: fetch.post('user'),
  edit: fetch.put('user'),
  getAll: fetch.get('user'),
  // eslint-disable-next-line
  get: fetch.get('user/${id}'),
  // eslint-disable-next-line
  delete: fetch.delete('user/${id}'),
};
