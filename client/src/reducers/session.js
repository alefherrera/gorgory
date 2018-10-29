import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGIN, LOGOUT } from '../constants';
import createMenu from '../util/createMenu';

const persistConfig = {
  key: 'login',
  storage,
};

const initialState = {
  user: {},
  menu: [],
};

const replaceState = () => ({
  [FULFILLED]: (state, { payload }) => ({
    ...state,
    ...payload,
    menu: createMenu(payload.user.role.name),
  }),
});

export default persistReducer(
  persistConfig,
  typeToReducer(
    {
      [LOGIN]: replaceState(),
      // [REFRESH_TOKEN]: replaceState(),
      [LOGOUT]: () => initialState,
    },
    initialState,
  ),
);
