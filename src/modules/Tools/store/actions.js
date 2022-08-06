import { axiosGame, axiosAccounts } from "services/api";
import {
  FETCH_TOOL_LIST_SUCCESS,
  FETCH_TOOL_LIST_ERROR,
  FETCH_TOOL_OPTIONS_SUCCESS,
  FETCH_TOOL_OPTIONS_ERROR,
  DELETE_TOOL_LIST_SUCCESS,
  DELETE_TOOL_LIST_ERROR,
  DELETE_TOOL_OPTIONS_SUCCESS,
  DELETE_TOOL_OPTIONS_ERROR,
  SAVE_TOOL_LIST_SUCCESS,
  SAVE_TOOL_LIST_ERROR,
  GET_POLL_LIST_SUCCESS,
  GET_POLL_LIST_ERROR,
  CLEAR_STORE,
  GET_SYSTEM_CONFIGURATION_ERROR,
  GET_SYSTEM_CONFIGURATION_SUCCESS,
  CLEAR_NAME,
} from "./actionTypes";
import {
  GET_TOOL_LIST_URL,
  GET_TOOL_OPTION_URL,
  DELETE_TOOL_LIST_URL,
  SAVE_TOOL_LIST_URL,
  DELETE_TOOL_OPTION_URL,
  GET_POLL_LIST_URL,
  GET_SYSTEM_CONFIGURATION_URL,
} from "constants/urls";

export const fetchToolList = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(GET_TOOL_LIST_URL + `/${data.tool_type}`);
      if (res.data?.data) {
        dispatch(fetchToolListSuccess(res.data.data));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(fetchToolListError(err.response?.data?.message || err.message));
    }
  };
};

export const fetchToolListSuccess = (data) => {
  return {
    type: FETCH_TOOL_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchToolListError = (error) => {
  return {
    type: FETCH_TOOL_LIST_ERROR,
    payload: error,
  };
};

export const fetchToolOptions = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(
        GET_TOOL_OPTION_URL + `/${data.tool_list_id}`
      );
      if (res.data?.data) {
        dispatch(fetchToolOptionsSuccess(res.data.data));
        cb();
      }
    } catch (err) {
      dispatch(
        fetchToolOptionsError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchToolOptionsSuccess = (data) => {
  return {
    type: FETCH_TOOL_OPTIONS_SUCCESS,
    payload: data,
  };
};

export const fetchToolOptionsError = (error) => {
  return {
    type: FETCH_TOOL_OPTIONS_ERROR,
    payload: error,
  };
};

export const deleteToolList = (data) => {
  return async (dispatch) => {
    try {
      // dispatch(deleteToolList(true));
      const res = await axiosGame.delete(
        DELETE_TOOL_LIST_URL + `/${data.tool_list_id}`
      );
      if (res.data?.data) dispatch(deleteToolListSuccess(res.data.data));
    } catch (err) {
      dispatch(deleteToolListError(err.response?.data?.message || err.message));
    }
  };
};

export const deleteToolListSuccess = (data) => {
  return {
    type: DELETE_TOOL_LIST_SUCCESS,
    payload: data,
  };
};

export const deleteToolListError = (error) => {
  return {
    type: DELETE_TOOL_LIST_ERROR,
    payload: error,
  };
};

export const deleteToolOption = (data) => {
  return async (dispatch) => {
    try {
      // dispatch(deleteToolOption(true));
      const res = await axiosGame.delete(
        DELETE_TOOL_OPTION_URL + `${+data.tool_option_id}`
      );
      if (res.data?.data) {
        dispatch(deleteToolOptionSuccess(res.data.data));
        // dispatch(fetchToolOptions({ tool_list_id: `${data.tool_option_id}` }));
      }
    } catch (err) {
      dispatch(
        deleteToolOptionError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const deleteToolOptionSuccess = (data) => {
  return {
    type: DELETE_TOOL_OPTIONS_SUCCESS,
    payload: data,
  };
};

export const deleteToolOptionError = (error) => {
  return {
    type: DELETE_TOOL_OPTIONS_ERROR,
    payload: error,
  };
};

export const saveToolList = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      // dispatch(saveToolList(true));
      const res = await axiosGame.post(SAVE_TOOL_LIST_URL, data);
      if (res.data?.data) {
        dispatch(saveToolListSuccess(res.data.data));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(saveToolListError(err.response?.data?.message || err.message));
      dispatch(fetchToolList({ tool_list_id: `${data.tool_list_id}` }));
    }
  };
};

export const saveToolListSuccess = (data) => {
  return {
    type: SAVE_TOOL_LIST_SUCCESS,
    payload: data,
  };
};

export const saveToolListError = (error) => {
  return {
    type: SAVE_TOOL_LIST_ERROR,
    payload: error,
  };
};

export const getPollList = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(GET_POLL_LIST_URL);
      if (res.data?.data) dispatch(getPollListSuccess(res.data.data));
    } catch (err) {
      dispatch(getPollListError(err.response?.data?.message || err.message));
    }
  };
};

export const getPollListSuccess = (data) => {
  return {
    type: GET_POLL_LIST_SUCCESS,
    payload: data,
  };
};

export const getPollListError = (error) => {
  return {
    type: GET_POLL_LIST_ERROR,
    payload: error,
  };
};

export const clearStore = () => {
  return {
    type: CLEAR_STORE,
  };
};
export const clearName = () => {
  return {
    type: CLEAR_NAME,
  };
};
export const getSystemConfiguration = (data, cb) => {
  return async (dispatch) => {
    try {
      const res = await axiosAccounts.post(GET_SYSTEM_CONFIGURATION_URL, data);
      if (res.data?.data) {
        dispatch(getSystemConfigurationSuccess(res.data.data));
        cb(res.data.data.systemConfiguration);
      }
    } catch (err) {
      // dispatch(setError(err.response?.data?.message || err.message));
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
