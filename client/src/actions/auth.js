// src/actions/auth.js

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
    
    if (data.otpRequired) {
      return { otpRequired: true, otpToken: data.otpToken , email : data.email};
    } else {
      dispatch({ type: "AUTH", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      navigate("/");
      return { otpRequired: false };
    }
  } catch (error) {
    console.log(error);
    return { otpRequired: false };
  }
};

export const verifyOtp = (otpData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.verifyOtp(otpData);
    if (data.success) {
      dispatch({ type: "AUTH", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      navigate("/");
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log('OTP verification failed:', error);
    return { success: false };
  }
};

export const forgotPassword = (email, navigate) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(email);
    console.log(data);
  } catch (error) {
    console.log("here is the error", error);
  }
};

export const resetPassword = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(authData);
    console.log(data);
    navigate("/Auth");
  } catch (error) {
    console.log(error.message);
  }
};

export const sendOtpForLanguageChange = (contactData) => async (dispatch) => {
  try {
    const response = await api.sendOtpForLanguageChange(contactData);
    console.log(response.data) ;
    if (response.data.success) {
      dispatch({ type: 'OTP_SENT', payload: response.data });
    }
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: error.message };
  }
};

export const verifyOtpForLanguageChange = (otpData) => async (dispatch) => {
  try {
    const response = await api.verifyOtpForLanguageChange(otpData);
    if (response.data.success) {
      dispatch({ type: 'OTP_VERIFIED', payload: response.data });
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: error.message };
  }
};