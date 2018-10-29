import { handleAction } from 'redux-actions';
import { COMPILE } from '../constants';

export default handleAction(COMPILE, state => state, {});
