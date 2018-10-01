import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResolution, defaultValue } from 'app/shared/model/resolution.model';

export const ACTION_TYPES = {
  FETCH_RESOLUTION_LIST: 'resolution/FETCH_RESOLUTION_LIST',
  FETCH_RESOLUTION: 'resolution/FETCH_RESOLUTION',
  CREATE_RESOLUTION: 'resolution/CREATE_RESOLUTION',
  UPDATE_RESOLUTION: 'resolution/UPDATE_RESOLUTION',
  DELETE_RESOLUTION: 'resolution/DELETE_RESOLUTION',
  RESET: 'resolution/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResolution>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ResolutionState = Readonly<typeof initialState>;

// Reducer

export default (state: ResolutionState = initialState, action): ResolutionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESOLUTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESOLUTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESOLUTION):
    case REQUEST(ACTION_TYPES.UPDATE_RESOLUTION):
    case REQUEST(ACTION_TYPES.DELETE_RESOLUTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESOLUTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESOLUTION):
    case FAILURE(ACTION_TYPES.CREATE_RESOLUTION):
    case FAILURE(ACTION_TYPES.UPDATE_RESOLUTION):
    case FAILURE(ACTION_TYPES.DELETE_RESOLUTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESOLUTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESOLUTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESOLUTION):
    case SUCCESS(ACTION_TYPES.UPDATE_RESOLUTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESOLUTION):
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

const apiUrl = 'api/resolutions';

// Actions

export const getEntities: ICrudGetAllAction<IResolution> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESOLUTION_LIST,
  payload: axios.get<IResolution>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IResolution> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESOLUTION,
    payload: axios.get<IResolution>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IResolution> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESOLUTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResolution> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESOLUTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResolution> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESOLUTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
