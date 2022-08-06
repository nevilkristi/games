import { axiosGame } from "services/api";
import {
  FETCH_FILTER_SUCCESS,
  FETCH_FILTER_ERROR,
  SET_LOADING,
  SET_GAME_FILTER,
  REMOVE_GAME_FILTER,
  SET_FILTER_BY,
  REMOVE_FILTER_BY,
  REMOVE_ALL_FILTER_BY,
  SET_GAME_SORTBY,
  REMOVE_ALL_GAME_FILTER,
  LIST_ASSIGNED_FILTER_SUCCESS,
  LIST_ASSIGNED_FILTER_ERROR,
  EDIT_ASSIGN_FILTER_SUCCESS,
  EDIT_ASSIGN_FILTER_ERROR,
  SET_ICEBREAKER_FAVORITE_FILTER,
  REMOVE_ICEBREAKER_FAVORITE_FILTER,
  SET_SEARCH_FIELD,
  SET_HAS_MORE,
} from "./actionTypes";

import {
  // fetchGameRating,
  fetchSingleGame,
} from "store/actions";
import {
  FETCH_FILTER_URL,
  FETCH_ASSIGNED_FILTER_URL,
  ADD_UPDATE_ASSIGN_FILTER_URL,
} from "constants/urls";

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});

export const fetchFilterError = (message) => ({
  type: FETCH_FILTER_ERROR,
  payload: message,
});
export const fetchFilterSuccess = (data) => ({
  type: FETCH_FILTER_SUCCESS,
  payload: data,
});

export const fetchFilter = (data) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosGame.post(FETCH_FILTER_URL, data);
      if (res.data?.data) {
        dispatch(fetchFilterSuccess(res.data.data));
      }
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(fetchFilterError(err.response?.data?.message || err.message));
      dispatch(setLoading(false));
    }
  };
};

export const setGameFilter = (data) => ({
  type: SET_GAME_FILTER,
  payload: data,
});

export const removeGameFilter = (data) => {
  return {
    type: REMOVE_GAME_FILTER,
    payload: data,
  };
};

export const removeAllGameFilter = () => ({
  type: REMOVE_ALL_GAME_FILTER,
});

export const setFilterBy = (data) => ({
  type: SET_FILTER_BY,
  payload: data,
});

export const removeFilterBy = (data) => ({
  type: REMOVE_FILTER_BY,
  payload: data,
});

export const removeAllFilterBy = () => ({
  type: REMOVE_ALL_FILTER_BY,
});

export const setGameSortBy = (data) => ({
  type: SET_GAME_SORTBY,
  payload: data,
});

export const fetchAssignedFilter = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(FETCH_ASSIGNED_FILTER_URL, data);
      if (res.data?.data) {
        dispatch(fetchAssignedFilterSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchAssignedFilterError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchAssignedFilterError = (message) => ({
  type: LIST_ASSIGNED_FILTER_ERROR,
  payload: message,
});

export const fetchAssignedFilterSuccess = (data) => ({
  type: LIST_ASSIGNED_FILTER_SUCCESS,
  payload: data,
});

export const editAssignFilter = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_ASSIGN_FILTER_URL, data);
      if (res.data?.data) {
        dispatch(editAssignFilterSuccess(res.data.data));
        dispatch(fetchSingleGame(data.game_id, false));
        // dispatch(fetchGameRating({ game_id: data.game_id }));
      }
    } catch (err) {
      dispatch(
        editAssignFilterError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const editAssignFilterSuccess = (data) => ({
  type: EDIT_ASSIGN_FILTER_SUCCESS,
  payload: data,
});

export const editAssignFilterError = (message) => ({
  type: EDIT_ASSIGN_FILTER_ERROR,
  payload: message,
});

export const setIcebreakerFavoriteFilter = (data) => ({
  type: SET_ICEBREAKER_FAVORITE_FILTER,
  payload: data,
});

export const removeIcebreakerFavoriteFilter = (data) => ({
  type: REMOVE_ICEBREAKER_FAVORITE_FILTER,
  payload: data,
});

export const setSearchField = (data) => ({
  type: SET_SEARCH_FIELD,
  payload: data,
});

export const setHasMore = (data) => ({
  type: SET_HAS_MORE,
  payload: data,
});
