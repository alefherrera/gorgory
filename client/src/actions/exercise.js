import { createApiAction } from './util';
import { GET_EXERCISES } from '../constants';
import api from '../api/client/exercise';

export const getExercises = createApiAction(GET_EXERCISES, api.getAll);
