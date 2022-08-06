import {
  SET_TOKEN_ERROR,
  SET_PAGE_DETAILS,
  REMOVE_PAGE_DETAILS,
  GET_PAGE_DETAILS_SUCCESS,
  GET_PAGE_DETAILS_ERROR,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR,
  SEEN_NOTIFICATION_SUCCESS,
  SEEN_NOTIFICATION_ERROR,
  SEEN_ALL_NOTIFICATION_SUCCESS,
  SEEN_ALL_NOTIFICATION_ERROR,
  GET_ALL_TUTORIAL_SUCCESS,
  GET_ALL_TUTORIAL_ERROR,
  GET_ALL_FAQ_SUCCESS,
  GET_ALL_FAQ_ERROR,
  GET_TUTORIAL_DETAIL_SUCCESS,
  GET_TUTORIAL_DETAIL_ERROR,
  SET_TUTORIAL_DATA,
  GET_SYSTEM_CONFIGURATION_SUCCESS,
  GET_SYSTEM_CONFIGURATION_ERROR,
  GET_ALL_TUTORIAL,
} from "./actionTypes";
import {
  GET_KEYWORD_DATA,
  GET_NOTIFICATION_URL,
  SEEN_NOTIFICATION_URL,
  SEEN_ALL_NOTIFICATION_URL,
  GET_TUTORIAL_URL,
  GET_FAQ_URL,
  GET_TUTORIAL_DETAIL_URL,
  GET_SYSTEM_CONFIGURATION_URL,
} from "constants/urls";
import { axiosAccounts, axiosAdmin, axiosGame } from "services/api";
import { fetchSingleGameLoading } from "store/actions";

export const setError = (message) => ({
  type: SET_TOKEN_ERROR,
  payload: message,
});

export const setPageDetails = (data) => ({
  type: SET_PAGE_DETAILS,
  payload: data,
});

export const removePageDetails = () => ({
  type: REMOVE_PAGE_DETAILS,
});

export const getPageDetails = (data, cb) => {
  return async (dispatch) => {
    try {
      dispatch(fetchSingleGameLoading(false));
      const res = await axiosAdmin.post(GET_KEYWORD_DATA, data);
      if (res.data?.data) {
        dispatch(getPageDetailsSuccess(res.data.data));
        cb(res.data.data.pageLinkData != null ? res.data.data.pageLinkData : 0);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getPageDetailsSuccess = (data) => ({
  type: GET_PAGE_DETAILS_SUCCESS,
  payload: data,
});

export const getPageDetailsError = (message) => ({
  type: GET_PAGE_DETAILS_ERROR,
  payload: message,
});

export const getNotification = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(GET_NOTIFICATION_URL, data);
      if (res.data?.data) {
        dispatch(getNotificationSuccess(res.data.data));
        cb(res.data.data.notifications);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getNotificationSuccess = (data) => ({
  type: GET_NOTIFICATION_SUCCESS,
  payload: data,
});

export const getNotificationError = (message) => ({
  type: GET_NOTIFICATION_ERROR,
  payload: message,
});

export const seenNotification = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(`${SEEN_NOTIFICATION_URL}/${data}`);
      if (res.data?.data) {
        dispatch(seenNotificationSuccess(data));
        cb(res.data.data.notifications);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const seenNotificationSuccess = (data) => ({
  type: SEEN_NOTIFICATION_SUCCESS,
  payload: data,
});

export const seenNotificationError = (message) => ({
  type: SEEN_NOTIFICATION_ERROR,
  payload: message,
});

export const seenAllNotification = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(SEEN_ALL_NOTIFICATION_URL);
      if (res.data?.data) {
        dispatch(seenAllNotificationSuccess(data));
        cb(res.data.data.notifications);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const seenAllNotificationSuccess = (data) => ({
  type: SEEN_ALL_NOTIFICATION_SUCCESS,
  payload: data,
});

export const seenAllNotificationError = (message) => ({
  type: SEEN_ALL_NOTIFICATION_ERROR,
  payload: message,
});

export const getTutorial = (data, cb) => {
  return async (dispatch) => {
    try {
      dispatch(getTutorialLoading(true));
      const res = await axiosAdmin.get(`${GET_TUTORIAL_URL}/${data}`);
      if (res.data?.data) {
        dispatch(getTutorialSuccess(res.data.data));
        cb(res.data.data.tutorial);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getTutorialLoading = (data) => ({
  type: GET_ALL_TUTORIAL,
  payload: data,
});

export const getTutorialSuccess = (data) => ({
  type: GET_ALL_TUTORIAL_SUCCESS,
  payload: data,
});

export const getTutorialError = (message) => ({
  type: GET_ALL_TUTORIAL_ERROR,
  payload: message,
});

export const getFaq = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosAdmin.post(GET_FAQ_URL, data);
      if (res.data?.data) {
        dispatch(getFaqSuccess(res.data.data));
        cb(res.data.data.faq);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getFaqSuccess = (data) => ({
  type: GET_ALL_FAQ_SUCCESS,
  payload: data,
});

export const getFaqError = (message) => ({
  type: GET_ALL_FAQ_ERROR,
  payload: message,
});

export const setTutorialData = (data) => ({
  type: SET_TUTORIAL_DATA,
  payload: data,
});

export const getTutorialById = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosAdmin.get(`${GET_TUTORIAL_DETAIL_URL}/${data}`);
      if (res.data?.data) {
        dispatch(getTutorialByIdSuccess(res.data.data));
        cb(res.data.data.tutorial);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getTutorialByIdSuccess = (data) => ({
  type: GET_TUTORIAL_DETAIL_SUCCESS,
  payload: data,
});

export const getTutorialByIdError = (message) => ({
  type: GET_TUTORIAL_DETAIL_ERROR,
  payload: message,
});

export const getSystemConfiguration = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosAccounts.post(GET_SYSTEM_CONFIGURATION_URL, data);
      if (res.data?.data) {
        dispatch(getSystemConfigurationSuccess(res.data.data));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };
};

export const getSystemConfigurationSuccess = (data) => ({
  type: GET_SYSTEM_CONFIGURATION_SUCCESS,
  payload: data,
});

export const getSystemConfigurationError = (message) => ({
  type: GET_SYSTEM_CONFIGURATION_ERROR,
  payload: message,
});
