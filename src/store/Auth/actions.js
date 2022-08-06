import {
  LOGOUT,
  SET_AUTH_DATA,
  SET_TOKEN,
  SET_TOKEN_LOADING,
  SET_TOKEN_ERROR,
  SET_PROFILE,
  SET_IS_AUTH,
} from "./actionTypes";
import { ACCESS_TOKEN_URL, GET_PROFILE_INFO } from "constants/urls";
import { axiosAccounts } from "services/api";
import { fetchSites } from "store/actions";

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAuth(true));
      const res = await axiosAccounts.get(GET_PROFILE_INFO);
      if (res.data?.data?.user) {
        dispatch(setProfileData(res.data.data.user));
      }
      dispatch(setLoadingAuth(false));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      dispatch(setLoadingAuth(false));
    }
  };
};

export const setProfileData = (data) => ({
  type: SET_PROFILE,
  payload: data,
});

export const fetchAccessToken = (data, cb) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAuth(true));
      const res = await axiosAccounts.post(ACCESS_TOKEN_URL, data);
      if (res.data?.data) {
        dispatch(setToken(res.data.data.token));
        dispatch(fetchProfile());
        dispatch(fetchSites());
        dispatch(setIsAuth(true));
        cb();
      }
      dispatch(setLoadingAuth(false));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      dispatch(setLoadingAuth(false));
    }
  };
};

export const setAuthData = (data) => ({
  type: SET_AUTH_DATA,
  payload: data,
});

export const setToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setLoadingAuth = (data) => ({
  type: SET_TOKEN_LOADING,
  payload: data,
});

export const setError = (message) => ({
  type: SET_TOKEN_ERROR,
  payload: message,
});

export const setIsAuth = (data) => ({
  type: SET_IS_AUTH,
  payload: data,
});
