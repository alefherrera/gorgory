import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

function getCurrent(signature) {
  return signature.current;
}

export const baseSelector = createSelector(entitiesSelector, entities => entities.signature);
export const signaturesSelector = createSelector(baseSelector, signature => signature.all);
export const signatureSelector = createSelector(baseSelector, signature => getCurrent(signature));
