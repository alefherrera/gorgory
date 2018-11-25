import { createSelector } from 'reselect';

function mergeResolutions(history) {
  return history.reduce((p, c) => [...p, ...c.results], []);
}

const baseSelector = createSelector(state => state.resolution, resolution => resolution);

const historySelector = createSelector(baseSelector, resolution => resolution.history);

export const outputSelector = createSelector(historySelector, history => mergeResolutions(history));
