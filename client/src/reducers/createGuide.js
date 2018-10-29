import { handleActions } from 'redux-actions';
import { CREATE_GUIDE, ADD_EXERCISE_TO_GUIDE } from '../constants';

const initialState = {
  exercises: [],
};

export default handleActions(
  {
    [CREATE_GUIDE]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [ADD_EXERCISE_TO_GUIDE]: (state, { payload }) => ({
      ...state,
      exercises: [...state.exercises, payload],
    }),
  },
  initialState,
);
