import { axiosGame, axiosAdmin } from "services/api";
import {
  CREATE_ICEBREAKER_SUCCESS,
  CREATE_ICEBREAKER_ERROR,
  DELETE_ICEBREAKER_SUCCESS,
  DELETE_ICEBREAKER_ERROR,
  FETCH_ICEBREAKER,
  FETCH_ICEBREAKER_SUCCESS,
  FETCH_ICEBREAKER_ERROR,
  FETCH_ICEBREAKER_LIST_SUCCESS,
  FETCH_ICEBREAKER_LIST_ERROR,
  FETCH_SINGLE_ICEBREAKER_SUCCESS,
  FETCH_SINGLE_ICEBREAKER_ERROR,
  FETCH_FAVORITE_ICEBREAKER_SUCCESS,
  FETCH_FAVORITE_ICEBREAKER_ERROR,
  SAVE_FAVORITE_ICEBREAKER_SUCCESS,
  SAVE_FAVORITE_ICEBREAKER_ERROR,
  REMOVE_FAVORITE_ICEBREAKER,
} from "./actionTypes";
import {
  FETCH_FAVORITE_ICEBREAKER_URL,
  FETCH_ICEBREAKER_URL,
  ADD_UPDATE_ICEBREAKER_URL,
  FETCH_ICEBREAKER_LIST_URL,
  DELETE_ICEBREAKER_URL,
  FETCH_SINGLE_ICEBREAKER_URL,
  SAVE_FAVORITE_ICEBREAKER,
} from "constants/urls";

export const removeFavoriteIceBreaker = (ibId) => ({
  type: REMOVE_FAVORITE_ICEBREAKER,
  payload: ibId,
});

export const createIceBreaker = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_ICEBREAKER_URL, data);
      if (res.data?.data) {
        dispatch(createIceBreakerSuccess(res.data.data));
        dispatch(fetchIceBreakerList());
      }
    } catch (err) {
      dispatch(
        createIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const createIceBreakerError = (message) => ({
  type: CREATE_ICEBREAKER_ERROR,
  payload: message,
});

export const createIceBreakerSuccess = (data) => ({
  type: CREATE_ICEBREAKER_SUCCESS,
  payload: data,
});

export const deleteIceBreaker = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.delete(
        `${DELETE_ICEBREAKER_URL}/${data.icebreaker_id}`
      );
      if (res.data?.data) {
        dispatch(deleteIceBreakerSuccess(res.data.data));
        dispatch(fetchIceBreakerList());
      }
    } catch (err) {
      dispatch(
        deleteIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const deleteIceBreakerError = (message) => ({
  type: DELETE_ICEBREAKER_ERROR,
  payload: message,
});

export const deleteIceBreakerSuccess = (data) => ({
  type: DELETE_ICEBREAKER_SUCCESS,
  payload: data,
});

export const fetchIceBreaker = (data, cb) => {
  return async (dispatch) => {
    try {
      dispatch(fetchIceBreakerData());
      const res = await axiosGame.post(FETCH_ICEBREAKER_URL, data);
      if (res.data?.data) {
        dispatch(fetchIceBreakerSuccess(res.data.data));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(
        fetchIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};
const fetchIceBreakerData = () => ({
  type: FETCH_ICEBREAKER,
});

export const fetchIceBreakerError = (message) => ({
  type: FETCH_ICEBREAKER_ERROR,
  payload: message,
});

export const fetchIceBreakerSuccess = (data) => ({
  type: FETCH_ICEBREAKER_SUCCESS,
  payload: data.rows,
});

export const fetchIceBreakerList = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(FETCH_ICEBREAKER_LIST_URL, data);
      if (res.data?.data) {
        dispatch(fetchIceBreakerListSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchIceBreakerListError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchIceBreakerListError = (message) => ({
  type: FETCH_ICEBREAKER_LIST_ERROR,
  payload: message,
});

export const fetchIceBreakerListSuccess = (data) => ({
  type: FETCH_ICEBREAKER_LIST_SUCCESS,
  payload: data.rows,
});

export const fetchSingleIceBreaker = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosAdmin.get(
        `${FETCH_SINGLE_ICEBREAKER_URL}/${data.icebreaker_id}/0`
      );
      if (res.data?.data) {
        dispatch(fetchSingleIceBreakerSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchSingleIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchSingleIceBreakerError = (message) => ({
  type: FETCH_SINGLE_ICEBREAKER_ERROR,
  payload: message,
});

export const fetchSingleIceBreakerSuccess = (data) => ({
  type: FETCH_SINGLE_ICEBREAKER_SUCCESS,
  payload: data,
});

export const fetchFavoriteIceBreaker = (data) => {
  return async (dispatch) => {
    data = {
      page_record: 20,
      page_no: 1,
    };
    try {
      const res = await axiosGame.post(FETCH_FAVORITE_ICEBREAKER_URL, data);

      if (res.data?.data?.rows) {
        dispatch(fetchFavoriteIceBreakerSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchFavoriteIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchFavoriteIceBreakerError = (message) => ({
  type: FETCH_FAVORITE_ICEBREAKER_ERROR,
  payload: message,
});

export const fetchFavoriteIceBreakerSuccess = (data) => ({
  type: FETCH_FAVORITE_ICEBREAKER_SUCCESS,
  payload: data,
});

export const saveFavoriteIceBreaker = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(SAVE_FAVORITE_ICEBREAKER, data);
      if (res.data?.data) {
        dispatch(saveFavoriteIceBreakerSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        saveFavoriteIceBreakerError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const saveFavoriteIceBreakerError = (message) => ({
  type: SAVE_FAVORITE_ICEBREAKER_ERROR,
  payload: message,
});

export const saveFavoriteIceBreakerSuccess = (data) => ({
  type: SAVE_FAVORITE_ICEBREAKER_SUCCESS,
  payload: data,
});
