import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

const baseSelector = createSelector(entitiesSelector, entities => entities.guide);

export const guidesSelector = createSelector(baseSelector, guide => guide.all);

export const guideSelector = createSelector(baseSelector, guide => guide.current);

export const searchSelector = createSelector(baseSelector, guide => guide.search);
