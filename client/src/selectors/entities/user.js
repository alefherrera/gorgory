import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

function getCurrent(user) {
  return user.current;
}

function filterFunc(users, filter) {
  return users.all.filter(
    x => x.name.toLowerCase().indexOf(filter) !== -1
      || x.username.toLowerCase().indexOf(filter) !== -1,
  );
}

export const baseSelector = createSelector(entitiesSelector, entities => entities.user);
const filterSelector = createSelector(baseSelector, subnet => subnet.filter || '');

export const usersSelector = createSelector(baseSelector, filterSelector, filterFunc);
export const userSelector = createSelector(baseSelector, user => getCurrent(user));
