import { axiosGame } from "services/api";

import {
FETCH_POLL,
FETCH_POLL_SUCCESS,
FETCH_POLL_ERROR,
} from "./../store/actionTypes";

import {FETCH_POLL_URL,} from "constants/urls";


// /* Polling */

export const handlePoll = (data) => {
    return async (dispatch) => {
      try {
        dispatch(fetchPoll(true));
        const res = await axiosGame.post(FETCH_POLL_URL, data);
        if (res.data?.data) {
          dispatch(fetchPollSuccess(res.data.data.data));
          // dispatch(handleRandomName({ tool_list_id: 1 }));
        }
      } catch (err) {
        dispatch(fetchPollError(err.response?.data?.message || err.message));
      }
    };
  };
  
  export const fetchPoll = (message) => ({
    type: FETCH_POLL,
    payload: message,
  });
  export const fetchPollSuccess = (data) => ({
    type: FETCH_POLL_SUCCESS,
    payload: data,
  });
  export const fetchPollError = (message) => ({
    type: FETCH_POLL_ERROR,
    payload: message,
  });
  