import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.routeFlow, routeFlow => routeFlow);

export const routeFlowSelector = createSelector(baseSelector, flow => flow);
