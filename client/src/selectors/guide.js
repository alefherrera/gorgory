import { createSelector } from "reselect";

const baseSelector = createSelector(state => state.guide, guide => guide);

export const lastExerciseSelector = createSelector(
  baseSelector,
  guide =>
    guide.exercises
      ? guide.exercises
          .concat()
          .sort((a, b) => a.id > b.id)
          .slice(-1)
          .pop()
      : 0
);
