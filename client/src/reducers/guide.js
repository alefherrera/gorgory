import { handleActions } from 'redux-actions';
import { NEW_GUIDE, NEW_EXERCISE, NEW_TEST } from '../constants';

const initialState = {
  exercises: [],
};

export default handleActions(
  {
    [NEW_GUIDE]: (state, payload) => ({
      name: payload.name,
    }),
    [NEW_EXERCISE]: state => ({
      ...state,
      exercises: [
        ...state.exercises,
        {
          id:
            state.exercises
              .concat()
              .sort((a, b) => a.id > b.id)
              .slice(-1)
              .pop() + 1,
        },
      ],
    }),

    [NEW_TEST]: (state, payload) => ({
      ...state,
      exercises: [...state.exercises],
    }),
  },
  initialState,
);
