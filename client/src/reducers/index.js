import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import resolution from './resolution';
import ui from './ui';
import createGuide from './createGuide';

export default combineReducers({
  session,
  resolution,
  form: formReducer,
  ui,
  createGuide,
});
