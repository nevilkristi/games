import { axiosGame } from "services/api";
import {
  CREATE_FILTER_SUCCESS,
  CREATE_FILTER_ERROR,
  DELETE_FILTER_SUCCESS,
  DELETE_FILTER_ERROR,
} from "./actionTypes";

import { ADD_FILTER_URL, DELETE_FILTER_URL } from "constants/urls";
import { fetchFilter } from "store/actions";

export const createFilter = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_FILTER_URL, data);
      if (res.data?.data) {
        dispatch(createFilterSuccess(res.data.data));
        dispatch(
          fetchFilter({
            filter_type: data.filter_type,
          })
        );
      }
    } catch (err) {
      dispatch(createFilterError(err.response?.data?.message || err.message));
    }
  };
};

export const createFilterError = (message) => ({
  type: CREATE_FILTER_ERROR,
  payload: message,
});
export const createFilterSuccess = (data) => ({
  type: CREATE_FILTER_SUCCESS,
  payload: data,
});

export const deleteFilter = (id, filterType) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.delete(`${DELETE_FILTER_URL}/${id}`);
      if (res.data?.data) {
        dispatch(deleteFilterSuccess(res.data.data));
        dispatch(
          fetchFilter({
            filter_type: filterType,
          })
        );
      }
    } catch (err) {
      dispatch(deleteFilterError(err.response?.data?.message || err.message));
    }
  };
};

export const deleteFilterError = (message) => ({
  type: DELETE_FILTER_ERROR,
  payload: message,
});

export const deleteFilterSuccess = (data) => ({
  type: DELETE_FILTER_SUCCESS,
  payload: data,
});
