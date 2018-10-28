import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.guide.all, guides => guides);

export const guideSelector = createSelector(baseSelector, guides => guides);
