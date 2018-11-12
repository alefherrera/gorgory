import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

export const baseSelector = createSelector(entitiesSelector, entities => entities.role);
export const rolesSelector = createSelector(baseSelector, role => role.all);
