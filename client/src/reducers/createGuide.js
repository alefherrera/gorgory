import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  CREATE_GUIDE,
  ADD_EXERCISE_TO_GUIDE,
  DELETE_EXERCISE_FROM_GUIDE,
  EDIT_EXERCISE_FROM_GUIDE,
  SELECT_EXERCISE_TO_EDIT,
  ADD_GUIDE,
  EDIT_GUIDE,
} from '../constants';

const initialState = {
  exercises: [],
  toEdit: {},
};

export default typeToReducer(
  {
    [CREATE_GUIDE]: () => initialState,
    [ADD_EXERCISE_TO_GUIDE]: (state, { payload }) => ({
      ...state,
      exercises: [...state.exercises, payload],
    }),
    [DELETE_EXERCISE_FROM_GUIDE]: (state, { payload }) => ({
      ...state,
      exercises: state.exercises.filter((e, i) => i !== payload.id),
    }),
    [EDIT_EXERCISE_FROM_GUIDE]: (state, { payload }) => ({
      ...state,
      exercises: state.exercises.map((e, i) => (i !== payload.id ? e : payload.exercise)),
    }),
    [SELECT_EXERCISE_TO_EDIT]: (state, { payload }) => ({
      ...state,
      exercises: [...state.exercises],
      toEdit: state.exercises[payload.id],
    }),

    [ADD_GUIDE]: {
      [FULFILLED]: () => initialState,
    },
    [EDIT_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        exercises: [...payload.exercises],
      }),
    },
  },
  initialState,
);
