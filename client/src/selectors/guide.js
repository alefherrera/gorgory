import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.guide, guide => guide);
