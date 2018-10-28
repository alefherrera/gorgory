import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import session from "./session";
import resolution from "./resolution";
import guide from "./guide";
import ui from "./ui";

export default combineReducers({
  session,
  resolution,
  form: formReducer,
  ui,
  guide
});
