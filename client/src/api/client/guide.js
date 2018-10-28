import fetch from '../fetch';

export default {
  add: fetch.post('guide'),
  getAll: fetch.get('guide'),
  // eslint-disable-next-line
  search: fetch.get('guide?q=${q}'),
};
