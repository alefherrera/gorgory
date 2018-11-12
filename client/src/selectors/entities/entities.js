import { createSelector } from 'reselect';

export const entitiesSelector = createSelector(state => state.entities, entities => entities);
