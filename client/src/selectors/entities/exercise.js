import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.exercise, exercise => exercise);

export const exerciseSelector = createSelector(baseSelector, exercise => exercise.current);
