import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

export const baseSelector = createSelector(entitiesSelector, entities => entities.user);
export const usersSelector = createSelector(baseSelector, user => user.all);
export const userSelector = createSelector(baseSelector, user => user.all.find(x => x.id === user.current));
