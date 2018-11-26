import { createAction } from 'redux-actions';
import { createApiAction } from './util';
import {
  ADD_GUIDE,
  GET_GUIDES,
  SEARCH_GUIDES,
  GET_GUIDE,
  CREATE_GUIDE,
  ADD_EXERCISE_TO_GUIDE,
  EDIT_EXERCISE_FROM_GUIDE,
  SELECT_EXERCISE_TO_EDIT,
  DELETE_EXERCISE_FROM_GUIDE,
  DELETE_GUIDE,
  GET_ACTIVE_GUIDES,
  EDIT_GUIDE,
  UPDATE_GUIDE,
} from '../constants';
import api from '../api/client/guide';

export const createGuide = createAction(CREATE_GUIDE);
export const addExerciseToGuide = createAction(ADD_EXERCISE_TO_GUIDE);
export const deleteExerciseFromGuide = createAction(DELETE_EXERCISE_FROM_GUIDE);
export const editExerciseFromGuide = createAction(EDIT_EXERCISE_FROM_GUIDE);
export const selectExerciseToEdit = createAction(SELECT_EXERCISE_TO_EDIT);
export const addGuide = createApiAction(ADD_GUIDE, api.add);
export const deleteGuide = createApiAction(DELETE_GUIDE, api.delete);

export const getGuides = createApiAction(GET_GUIDES, api.getAll);
export const getGuide = createApiAction(GET_GUIDE, api.get);
export const getActiveGuides = createApiAction(GET_ACTIVE_GUIDES, api.getActive);
export const searchGuides = createApiAction(SEARCH_GUIDES, api.search);

// Anda a saber que hacer esto.. jaja
export const editGuide = createApiAction(EDIT_GUIDE, api.get);
export const updateGuide = createApiAction(UPDATE_GUIDE, api.update);
export const dummy = createAction('DUMMY');
