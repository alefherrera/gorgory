import fetch from '../fetch';

export default {
  getAll: fetch.get('exercises'),
  get: fetch.get('exercises'),
};
