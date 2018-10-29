import { createSelector } from 'reselect';

export const createdGuideSelector = createSelector(state => state.createGuide, guide => guide);
