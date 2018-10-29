import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.resolution, resolution => resolution);

export const outputSelector = createSelector(baseSelector, resolution => resolution.results);
