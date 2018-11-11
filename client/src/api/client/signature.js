import fetch from '../fetch';

export default {
  add: fetch.post('signature'),
  edit: fetch.put('signature'),
  getAll: fetch.get('signature'),
  // eslint-disable-next-line
  get: fetch.get('signature/${id}'),
  // eslint-disable-next-line
  delete: fetch.delete('signature/${id}'),
};
