import fetch from '../fetch';

export default {
  // eslint-disable-next-line
  upload: fetch.file('resolution/upload/${id}'),
  // eslint-disable-next-line
  getLast: fetch.get('resolution/last/${exerciseId}'),
};
