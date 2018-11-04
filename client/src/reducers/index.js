import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import resolution from './resolution';
import ui from './ui';
import createGuide from './createGuide';
import guide from './guide';
import exercise from './exercise';
import course from './course';

export default combineReducers({
  session,
  resolution,
  form: formReducer,
  ui,
  createGuide,
  guide,
  exercise,
  course,
});
