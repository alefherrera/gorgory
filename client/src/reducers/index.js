import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import session from './session';

export default combineReducers({
  session,
  form: formReducer,
  router: routerReducer,
});
