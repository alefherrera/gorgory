import { createAction } from 'redux-actions';
import { createApiAction } from './util';
import {
  ADD_GUIDE,
  GET_GUIDES,
  GET_ALL_GUIDES,
  SEARCH_GUIDES,
  GET_GUIDE,
  CREATE_GUIDE,
  ADD_EXERCISE_TO_GUIDE,
  DELETE_GUIDE,
} from '../constants';
import api from '../api/client/guide';

export const createGuide = createAction(CREATE_GUIDE);
export const addExerciseToGuide = createAction(ADD_EXERCISE_TO_GUIDE);
export const addGuide = createApiAction(ADD_GUIDE, api.add);
export const getGuides = createApiAction(GET_GUIDES, api.getAll);
export const getAllGuides = createApiAction(GET_ALL_GUIDES, api.getAllNoDate);
export const getGuide = createApiAction(GET_GUIDE, api.get);
export const deleteGuide = createApiAction(DELETE_GUIDE, api.delete);
export const searchGuides = createApiAction(SEARCH_GUIDES, api.search);
