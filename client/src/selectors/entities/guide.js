import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

const baseSelector = createSelector(entitiesSelector, entities => entities.guides);

export const guidesSelector = createSelector(baseSelector, guides => guides.all);

export const guideSelector = createSelector(baseSelector, guides => guides.current);

export const searchSelector = createSelector(baseSelector, guides => guides.search);
