import { createAction } from 'redux-actions';
import { createApiAction } from './util';
import { ADD_GUIDE, CREATE_GUIDE, ADD_EXERCISE_TO_GUIDE } from '../constants';
import api from '../api/client/guide';

export const addGuide = createApiAction(ADD_GUIDE, api.add);

export const createGuide = createAction(CREATE_GUIDE);
export const addExerciseToGuide = createAction(ADD_EXERCISE_TO_GUIDE);
