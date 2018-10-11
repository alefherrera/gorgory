import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import session from './session';
import resolution from './resolution';

export default combineReducers({
  session,
  resolution,
  form: formReducer,
  router: routerReducer,
});
