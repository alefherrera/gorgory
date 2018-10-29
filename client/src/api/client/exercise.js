import fetch from '../fetch';

export default {
  getAll: fetch.get('exercise'),
  get: fetch.get('exercise/${id}'),
};
