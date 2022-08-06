import { axiosGame } from "services/api";
import {
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_UPDATE_NOTE_SUCCESS,
  ADD_UPDATE_NOTE_ERROR,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
} from "./actionTypes";
import {
  FETCH_NOTE_URL,
  ADD_UPDATE_NOTE_URL,
  DELETE_NOTE_URL,
} from "constants/urls";
import { fetchSingleGame } from "store/actions";
export const fetchNote = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(FETCH_NOTE_URL);
      if (res.data) {
        dispatch(fetchNoteSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(fetchNoteError(err.response?.data?.message || err.message));
    }
  };
};

export const fetchNoteError = (message) => ({
  type: FETCH_NOTE_ERROR,
  payload: message,
});

export const fetchNoteSuccess = (data) => ({
  type: FETCH_NOTE_SUCCESS,
  payload: data,
});

export const addUpdateNote = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_NOTE_URL, data);
      if (res.data?.data) {
        dispatch(fetchNote({}));
        dispatch(addUpdateNoteSuccess(res.data.data.data));
        dispatch(fetchSingleGame(data.game_id, false));
      }
    } catch (err) {
      dispatch(addUpdateNoteError(err.response?.data?.message || err.message));
    }
  };
};

export const addUpdateNoteError = (message) => ({
  type: ADD_UPDATE_NOTE_ERROR,
  payload: message,
});

export const addUpdateNoteSuccess = (data) => ({
  type: ADD_UPDATE_NOTE_SUCCESS,
  payload: data,
});

export const deleteNote = (id, gameId) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.delete(`${DELETE_NOTE_URL}/${id}`);
      if (res.data?.data) {
        dispatch(fetchNote());
        dispatch(deleteNoteSuccess(res.data.data.data));
        gameId && dispatch(fetchSingleGame(gameId, false));
      }
    } catch (err) {
      dispatch(deleteNoteError(err.response?.data?.message || err.message));
    }
  };
};

export const deleteNoteError = (message) => ({
  type: DELETE_NOTE_ERROR,
  payload: message,
});

export const deleteNoteSuccess = (data) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: data,
});
