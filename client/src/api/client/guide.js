import fetch from '../fetch';

export default {
  add: fetch.post('guide'),
  getAll: fetch.get('guide'),
};
