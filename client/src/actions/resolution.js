import { createApiAction } from './util';
import { UPLOAD_RESOLUTION } from '../constants';
import api from '../api/client/resolution';

export const uploadResolution = createApiAction(UPLOAD_RESOLUTION, api.upload);
