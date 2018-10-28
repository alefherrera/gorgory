import { createApiAction } from "./util";
import { ADD_GUIDE, NEW_GUIDE } from "../constants";
import api from "../api/client/guide";
import { createAction } from "redux-actions";

export const addGuide = createApiAction(ADD_GUIDE, api.add);

export const newGuide = createAction(NEW_GUIDE);
