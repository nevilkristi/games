import {
  CREATE_ICEBREAKER,
  CREATE_ICEBREAKER_SUCCESS,
  CREATE_ICEBREAKER_ERROR,
  DELETE_ICEBREAKER,
  DELETE_ICEBREAKER_SUCCESS,
  DELETE_ICEBREAKER_ERROR,
  FETCH_ICEBREAKER,
  FETCH_ICEBREAKER_SUCCESS,
  FETCH_ICEBREAKER_ERROR,
  FETCH_ICEBREAKER_LIST,
  FETCH_ICEBREAKER_LIST_SUCCESS,
  FETCH_ICEBREAKER_LIST_ERROR,
  FETCH_SINGLE_ICEBREAKER,
  FETCH_SINGLE_ICEBREAKER_SUCCESS,
  FETCH_SINGLE_ICEBREAKER_ERROR,
  FETCH_FAVORITE_ICEBREAKER,
  FETCH_FAVORITE_ICEBREAKER_SUCCESS,
  FETCH_FAVORITE_ICEBREAKER_ERROR,
  SAVE_FAVORITE_ICEBREAKER,
  SAVE_FAVORITE_ICEBREAKER_SUCCESS,
  SAVE_FAVORITE_ICEBREAKER_ERROR,
  REMOVE_FAVORITE_ICEBREAKER,
} from "./actionTypes";

const initialState = {
  loading: false,
  loadingIceBreaker: false,
  iceBreaker: [],
  iceBreakerList: [],
  iceBreakerListFavorite: [],
  singleIceBreaker: [],
};

const iceBreakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ICEBREAKER:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        iceBreaker: action.payload,
      };
    case CREATE_ICEBREAKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ICEBREAKER:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        iceBreaker: action.payload,
      };
    case DELETE_ICEBREAKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ICEBREAKER:
      return {
        ...state,
        loadingIceBreaker: true,
      };
    case FETCH_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loadingIceBreaker: false,
        iceBreaker: action.payload,
      };
    case FETCH_ICEBREAKER_ERROR:
      return {
        ...state,
        loadingIceBreaker: false,
        error: action.payload,
      };
    case FETCH_ICEBREAKER_LIST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ICEBREAKER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        iceBreakerList: action.payload !== undefined ? action.payload : [],
      };
    case FETCH_ICEBREAKER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SINGLE_ICEBREAKER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleIceBreaker: action.payload,
      };
    case FETCH_SINGLE_ICEBREAKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FAVORITE_ICEBREAKER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAVORITE_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        iceBreakerListFavorite: action.payload.rows,
      };
    case FETCH_FAVORITE_ICEBREAKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_FAVORITE_ICEBREAKER:
      return {
        ...state,
        loading: true,
      };
    case SAVE_FAVORITE_ICEBREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_FAVORITE_ICEBREAKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_FAVORITE_ICEBREAKER:
      return {
        ...state,
        iceBreakerListFavorite: state.iceBreakerListFavorite.filter(
          (i) => i.icebreaker_id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default iceBreakerReducer;
