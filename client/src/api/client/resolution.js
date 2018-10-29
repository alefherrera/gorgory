import fetch from '../fetch';

export default {
  // eslint-disable-next-line
  upload: fetch.file('resolution/upload/${id}'),
  getLast: fetch.get('resolution/last'),
};
