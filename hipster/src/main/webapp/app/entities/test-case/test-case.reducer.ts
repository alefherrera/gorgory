import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITestCase, defaultValue } from 'app/shared/model/test-case.model';

export const ACTION_TYPES = {
  FETCH_TESTCASE_LIST: 'testCase/FETCH_TESTCASE_LIST',
  FETCH_TESTCASE: 'testCase/FETCH_TESTCASE',
  CREATE_TESTCASE: 'testCase/CREATE_TESTCASE',
  UPDATE_TESTCASE: 'testCase/UPDATE_TESTCASE',
  DELETE_TESTCASE: 'testCase/DELETE_TESTCASE',
  RESET: 'testCase/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITestCase>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TestCaseState = Readonly<typeof initialState>;

// Reducer

export default (state: TestCaseState = initialState, action): TestCaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TESTCASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TESTCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TESTCASE):
    case REQUEST(ACTION_TYPES.UPDATE_TESTCASE):
    case REQUEST(ACTION_TYPES.DELETE_TESTCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TESTCASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TESTCASE):
    case FAILURE(ACTION_TYPES.CREATE_TESTCASE):
    case FAILURE(ACTION_TYPES.UPDATE_TESTCASE):
    case FAILURE(ACTION_TYPES.DELETE_TESTCASE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTCASE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTCASE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TESTCASE):
    case SUCCESS(ACTION_TYPES.UPDATE_TESTCASE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TESTCASE):
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

const apiUrl = 'api/test-cases';

// Actions

export const getEntities: ICrudGetAllAction<ITestCase> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TESTCASE_LIST,
  payload: axios.get<ITestCase>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITestCase> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TESTCASE,
    payload: axios.get<ITestCase>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITestCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TESTCASE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITestCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TESTCASE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITestCase> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TESTCASE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
