import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_UPDATE_NOTE,
  ADD_UPDATE_NOTE_SUCCESS,
  ADD_UPDATE_NOTE_ERROR,
} from "./actionTypes";

const initialState = {
  loading: false,
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.rows !== undefined ? action.payload.rows : [],
      };
    case FETCH_NOTE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_UPDATE_NOTE:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_UPDATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default noteReducer;
