import { createAction } from 'redux-actions';
import { createApiAction } from './util';
import { ADD_GUIDE, NEW_GUIDE, NEW_TEST } from '../constants';
import api from '../api/client/guide';

export const addGuide = createApiAction(ADD_GUIDE, api.add);

export const newGuide = createAction(NEW_GUIDE);

export const newTest = createAction(NEW_TEST);
