import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IArgument, defaultValue } from 'app/shared/model/argument.model';

export const ACTION_TYPES = {
  FETCH_ARGUMENT_LIST: 'argument/FETCH_ARGUMENT_LIST',
  FETCH_ARGUMENT: 'argument/FETCH_ARGUMENT',
  CREATE_ARGUMENT: 'argument/CREATE_ARGUMENT',
  UPDATE_ARGUMENT: 'argument/UPDATE_ARGUMENT',
  DELETE_ARGUMENT: 'argument/DELETE_ARGUMENT',
  RESET: 'argument/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArgument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ArgumentState = Readonly<typeof initialState>;

// Reducer

export default (state: ArgumentState = initialState, action): ArgumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARGUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARGUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARGUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ARGUMENT):
    case REQUEST(ACTION_TYPES.DELETE_ARGUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARGUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARGUMENT):
    case FAILURE(ACTION_TYPES.CREATE_ARGUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ARGUMENT):
    case FAILURE(ACTION_TYPES.DELETE_ARGUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARGUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARGUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARGUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ARGUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARGUMENT):
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

const apiUrl = 'api/arguments';

// Actions

export const getEntities: ICrudGetAllAction<IArgument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ARGUMENT_LIST,
  payload: axios.get<IArgument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IArgument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARGUMENT,
    payload: axios.get<IArgument>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArgument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARGUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IArgument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARGUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArgument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARGUMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
