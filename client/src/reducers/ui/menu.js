import { handleActions } from 'redux-actions';
import { OPEN_MENU, CLOSE_MENU } from '../../constants';

const initialState = {
  open: false,
};

export default handleActions(
  {
    [OPEN_MENU]: state => ({ ...state, open: true }),
    [CLOSE_MENU]: state => ({ ...state, open: false }),
  },
  initialState,
);
