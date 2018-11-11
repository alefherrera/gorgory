import fetch from '../fetch';

export default {
  add: fetch.post('guide'),
  getAll: fetch.get('guide'),
  getAllNoDate: fetch.get('guide/noDate'),
  // eslint-disable-next-line
  search: fetch.get('guide?q=${q}'),
  // eslint-disable-next-line
  get: fetch.get('guide/${id}'),
  // eslint-disable-next-line
  delete: fetch.delete('guide/${id}'),
};
