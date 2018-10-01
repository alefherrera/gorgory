import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGuide, defaultValue } from 'app/shared/model/guide.model';

export const ACTION_TYPES = {
  FETCH_GUIDE_LIST: 'guide/FETCH_GUIDE_LIST',
  FETCH_GUIDE: 'guide/FETCH_GUIDE',
  CREATE_GUIDE: 'guide/CREATE_GUIDE',
  UPDATE_GUIDE: 'guide/UPDATE_GUIDE',
  DELETE_GUIDE: 'guide/DELETE_GUIDE',
  RESET: 'guide/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGuide>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type GuideState = Readonly<typeof initialState>;

// Reducer

export default (state: GuideState = initialState, action): GuideState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GUIDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GUIDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GUIDE):
    case REQUEST(ACTION_TYPES.UPDATE_GUIDE):
    case REQUEST(ACTION_TYPES.DELETE_GUIDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GUIDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GUIDE):
    case FAILURE(ACTION_TYPES.CREATE_GUIDE):
    case FAILURE(ACTION_TYPES.UPDATE_GUIDE):
    case FAILURE(ACTION_TYPES.DELETE_GUIDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GUIDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GUIDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GUIDE):
    case SUCCESS(ACTION_TYPES.UPDATE_GUIDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GUIDE):
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

const apiUrl = 'api/guides';

// Actions

export const getEntities: ICrudGetAllAction<IGuide> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GUIDE_LIST,
  payload: axios.get<IGuide>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IGuide> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GUIDE,
    payload: axios.get<IGuide>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGuide> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GUIDE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGuide> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GUIDE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGuide> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GUIDE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
