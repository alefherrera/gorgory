import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { CREATE_GUIDE, ADD_EXERCISE_TO_GUIDE, ADD_GUIDE } from '../constants';

const initialState = {
  exercises: [],
};

export default typeToReducer(
  {
    [CREATE_GUIDE]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [ADD_EXERCISE_TO_GUIDE]: (state, { payload }) => ({
      ...state,
      exercises: [...state.exercises, payload],
    }),
    [ADD_GUIDE]: {
      [FULFILLED]: () => initialState,
    },
  },
  initialState,
);
