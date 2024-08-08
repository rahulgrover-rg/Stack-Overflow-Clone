import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import langReducer from './language.js' ;
import otpReducer from "./otp";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
  langReducer ,
  otpReducer ,
});
