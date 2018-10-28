import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.guide, guides => guides);

export const guidesSelector = createSelector(baseSelector, guides => guides.all);

export const guideSelector = createSelector(baseSelector, guides => guides.current);

export const searchSelector = createSelector(baseSelector, guides => guides.search);
