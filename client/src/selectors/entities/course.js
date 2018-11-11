import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.course, course => course);

export const coursesSelector = createSelector(baseSelector, course => course.all);
export const courseSelector = createSelector(baseSelector, course => course.current);
