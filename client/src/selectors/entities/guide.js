import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

const baseSelector = createSelector(entitiesSelector, entities => entities.guide);

export const editGuideSelector = createSelector(baseSelector, guide => guide.toEdit);

export const guidesSelector = createSelector(baseSelector, guide => guide.all);

export const guideSelector = createSelector(baseSelector, guide => guide.current);

export const searchSelector = createSelector(baseSelector, guide => guide.search);

export const reportSelector = createSelector(baseSelector, guide => guide.report);

function getMostExercise(report, propertySelector) {
  if (report.exerciseTotals) {
    return report.exerciseTotals.reduce(
      (prev, current) => (propertySelector(prev) > propertySelector(current) ? prev : current),
    );
  }
  return {};
}

export const mostFailedExerciseSelector = createSelector(reportSelector, report => getMostExercise(report, exerciseTotal => exerciseTotal.totals.error));
export const mostUnknownExerciseSelector = createSelector(reportSelector, report => getMostExercise(report, exerciseTotal => exerciseTotal.totals.unknown));
