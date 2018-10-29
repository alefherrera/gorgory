import { createApiAction } from './util';
import { GET_EXERCISES, GET_EXERCISE } from '../constants';
import api from '../api/client/exercise';

export const getExercises = createApiAction(GET_EXERCISES, api.getAll);
export const getExercise = createApiAction(GET_EXERCISE, api.get);
