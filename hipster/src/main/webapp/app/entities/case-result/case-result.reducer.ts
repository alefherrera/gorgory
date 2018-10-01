import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICaseResult, defaultValue } from 'app/shared/model/case-result.model';

export const ACTION_TYPES = {
  FETCH_CASERESULT_LIST: 'caseResult/FETCH_CASERESULT_LIST',
  FETCH_CASERESULT: 'caseResult/FETCH_CASERESULT',
  CREATE_CASERESULT: 'caseResult/CREATE_CASERESULT',
  UPDATE_CASERESULT: 'caseResult/UPDATE_CASERESULT',
  DELETE_CASERESULT: 'caseResult/DELETE_CASERESULT',
  RESET: 'caseResult/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICaseResult>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CaseResultState = Readonly<typeof initialState>;

// Reducer

export default (state: CaseResultState = initialState, action): CaseResultState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CASERESULT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CASERESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CASERESULT):
    case REQUEST(ACTION_TYPES.UPDATE_CASERESULT):
    case REQUEST(ACTION_TYPES.DELETE_CASERESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CASERESULT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CASERESULT):
    case FAILURE(ACTION_TYPES.CREATE_CASERESULT):
    case FAILURE(ACTION_TYPES.UPDATE_CASERESULT):
    case FAILURE(ACTION_TYPES.DELETE_CASERESULT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASERESULT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASERESULT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CASERESULT):
    case SUCCESS(ACTION_TYPES.UPDATE_CASERESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CASERESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/case-results';

// Actions

export const getEntities: ICrudGetAllAction<ICaseResult> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CASERESULT_LIST,
  payload: axios.get<ICaseResult>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICaseResult> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CASERESULT,
    payload: axios.get<ICaseResult>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICaseResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CASERESULT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICaseResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CASERESULT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICaseResult> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CASERESULT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
