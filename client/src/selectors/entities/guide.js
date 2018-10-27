import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.guides, guides => guides);

export const outputSelector = createSelector(baseSelector, guides => guides);
