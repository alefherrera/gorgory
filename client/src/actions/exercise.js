import { createAction } from "redux-actions";
import { createApiAction } from "./util";
import { GET_EXERCISES, NEW_EXERCISE } from "../constants";
import api from "../api/client/exercise";

export const getExercises = createApiAction(GET_EXERCISES, api.getAll);

export const newExercise = createAction(NEW_EXERCISE);
