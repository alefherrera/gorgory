import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

function getCurrent(user) {
  return user.all.find(x => x.id === user.current);
}

export const baseSelector = createSelector(entitiesSelector, entities => entities.user);
export const usersSelector = createSelector(baseSelector, user => user.all);
export const userSelector = createSelector(baseSelector, user => getCurrent(user));
