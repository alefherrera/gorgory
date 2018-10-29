import intersection from 'lodash/intersection';

const isAuthorized = (owned, needed) => {
  const inter = intersection(needed, owned);
  return needed.length === inter.length;
};

export default isAuthorized;
