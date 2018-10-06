import { createAction } from 'redux-actions';

export const createApiAction = (type, apiCall) => (...args) => (dispatch, getState) => {
  const apiCaller = apiCall(dispatch, getState);
  dispatch(createAction(type, apiCaller)(...args));
};
