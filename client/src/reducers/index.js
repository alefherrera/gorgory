import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import resolution from './resolution';
import ui from './ui';
import guide from './guide';
import exercise from './exercise';

export default combineReducers({
  session,
  resolution,
  form: formReducer,
  ui,
  guide,
  exercise,
});
