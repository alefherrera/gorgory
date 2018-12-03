import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  GET_GUIDES,
  GET_ACTIVE_GUIDES,
  SEARCH_GUIDES,
  GET_GUIDE,
  DELETE_GUIDE,
  EDIT_GUIDE,
  ADD_EXERCISE_TO_GUIDE,
  ADD_GUIDE,
  GET_GUIDE_REPORT,
} from '../../constants';

const report = {
  name: 'Guia 1',
  courses: [
    {
      name: 'Com 1',
      totals: {
        done: 3,
        error: 10,
        unknown: 5,
      },
      students: [
        {
          student: {
            name: 'Juanito',
          },
          totals: {
            done: 1,
            error: 1,
            unknown: 1,
          },
          exercise_results: [
            {
              exercise: {
                language: 'JAVA',
                description: 'hace tal cosa',
              },
              result: {
                status: 'done',
              },
            },
          ],
        },
        {
          student: {
            name: 'Robertito',
          },
          totals: {
            done: 1,
            error: 1,
            unknown: 1,
          },
          exercise_results: [
            {
              exercise: {
                language: 'PYTHON',
                description: 'hace tal otra',
              },
              result: {
                status: 'error',
              },
            },
          ],
        },
        {
          student: {
            name: 'Robertito',
          },
          totals: {
            done: 1,
            error: 1,
            unknown: 1,
          },
          exercise_results: [
            {
              exercise: {
                language: 'PYTHON',
                description: 'hace tal otra',
              },
              result: {
                status: 'unknown',
              },
            },
          ],
        },
      ],
    },
  ],
};

const initialState = {
  all: [],
  search: [],
  current: {},
  toEdit: {},
  report,
};

export default typeToReducer(
  {
    [ADD_GUIDE]: {
      [FULFILLED]: () => initialState,
    },
    [GET_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [GET_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [GET_ACTIVE_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [SEARCH_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        search: payload,
      }),
    },
    [GET_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
    [DELETE_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: state.all.filter(x => x.id !== payload),
      }),
    },
    [EDIT_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        toEdit: payload,
      }),
    },
    [ADD_EXERCISE_TO_GUIDE]: (state, { payload }) => ({
      ...state,
      toEdit: {
        ...state.toEdit,
        exercises: state.toEdit.exercises && [...state.toEdit.exercises, payload],
      },
    }),
    [GET_GUIDE_REPORT]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        report: payload,
      }),
    },
  },
  initialState,
);
