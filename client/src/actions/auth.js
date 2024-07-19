import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (email,navigate) => async(dispatch) => {
  try {
    const {data} = await api.forgotPassword(email) ;
    console.log(data);
  } catch (error) {
    console.log('here is the error' , error) ;
  }
}

export const resetPassword = (authData,navigate) => async(dispatch) => {
  try {
    const {data} = await api.resetPassword(authData) ;
    console.log(data) ;
    navigate('/Auth') ;
  } catch (error) {
    console.log(error.message);
  }
}
