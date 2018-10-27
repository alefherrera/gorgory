import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.guides, guides => guides);

export const guideSelector = createSelector(baseSelector, guides => guides);
