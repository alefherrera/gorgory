import fetch from '../fetch';

export default {
  getAll: fetch.get('exercise'),
  // eslint-disable-next-line
  get: fetch.get('exercise/${id}'),
};
