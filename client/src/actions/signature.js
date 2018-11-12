import { createApiAction } from './util';
import {
  ADD_SIGNATURE,
  EDIT_SIGNATURE,
  DELETE_SIGNATURE,
  GET_SIGNATURES,
  GET_SIGNATURE,
} from '../constants';
import api from '../api/client/signature';

export const addSignature = createApiAction(ADD_SIGNATURE, api.add);
export const editSignature = createApiAction(EDIT_SIGNATURE, api.edit);
export const deleteSignature = createApiAction(DELETE_SIGNATURE, api.delete);
export const getSignatures = createApiAction(GET_SIGNATURES, api.getAll);
export const getSignature = createApiAction(GET_SIGNATURE, api.get);
