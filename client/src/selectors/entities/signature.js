import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

function getCurrent(signature) {
  return signature.all.find(x => x.id === signature.current);
}

export const baseSelector = createSelector(entitiesSelector, entities => entities.signature);
export const signatureSelector = createSelector(baseSelector, signature => signature.all);
export const signaturesSelector = createSelector(baseSelector, signature => getCurrent(signature));
