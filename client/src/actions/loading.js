import { createAction } from 'redux-actions';
import { API_LOADING, API_SUCCESS, API_FAIL } from '../constants';

export const apiLoading = createAction(API_LOADING);
export const apiSuccess = createAction(API_SUCCESS);
export const apiFail = createAction(API_FAIL);
