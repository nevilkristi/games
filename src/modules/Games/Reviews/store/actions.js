import { axiosGame } from "services/api";
import {
  FETCH_SINGLE_RATING_SUCCESS,
  FETCH_SINGLE_RATING_ERROR,
  FETCH_GAME_RATING_SUCCESS,
  FETCH_GAME_RATING_ERROR,
  ADD_UPDATE_RATING_SUCCESS,
  ADD_UPDATE_RATING_ERROR,
  RESET_RATING_DATA,
  UPDATE_ATTACHMENT,
} from "./actionTypes";
import {
  RATING_DETAILS_URL,
  FETCH_GAME_RATING,
  ADD_UPDATE_RATING_URL,
} from "constants/urls";

export const fetchSingleRating = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosGame.get(RATING_DETAILS_URL + "/" + id);
      if (response?.data?.data) {
        dispatch(fetchSingleRatingSuccess(response.data));
      }
    } catch (err) {
      dispatch(
        fetchSingleRatingError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchSingleRatingSuccess = (data) => {
  return {
    type: FETCH_SINGLE_RATING_SUCCESS,
    payload: data,
  };
};

export const fetchSingleRatingError = (error) => {
  return {
    type: FETCH_SINGLE_RATING_ERROR,
    payload: error,
  };
};

export const fetchGameRating = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(FETCH_GAME_RATING, data);
      if (res?.data?.data) {
        dispatch(fetchGameRatingSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchGameRatingError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchGameRatingError = (message) => ({
  type: FETCH_GAME_RATING_ERROR,
  payload: message,
});

export const fetchGameRatingSuccess = (data) => ({
  type: FETCH_GAME_RATING_SUCCESS,
  payload: data,
});

export const resetRattingData = () => ({
  type: RESET_RATING_DATA,
  payload: [],
});

export const addUpdateRating = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_RATING_URL, data);
      if (res.data?.data) {
        cb();
        dispatch(addUpdateRatingSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        addUpdateRatingError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const addUpdateRatingSuccess = (data) => ({
  type: ADD_UPDATE_RATING_SUCCESS,
  payload: data,
});

export const addUpdateRatingError = (message) => ({
  type: ADD_UPDATE_RATING_ERROR,
  payload: message,
});

export const updateAttachment = (data) => ({
  type: UPDATE_ATTACHMENT,
  payload: data,
});
