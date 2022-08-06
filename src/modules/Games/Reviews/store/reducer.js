import {
  FETCH_SINGLE_RATING,
  FETCH_SINGLE_RATING_SUCCESS,
  FETCH_SINGLE_RATING_ERROR,
  FETCH_GAME_RATING,
  FETCH_GAME_RATING_SUCCESS,
  FETCH_GAME_RATING_ERROR,
  ADD_UPDATE_RATING,
  ADD_UPDATE_RATING_SUCCESS,
  ADD_UPDATE_RATING_ERROR,
  RESET_RATING_DATA,
  UPDATE_ATTACHMENT,
} from "./actionTypes";

const initialState = {
  loading: false,
  GameRating: [],
  rating: [],
  GameName: "",
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_RATING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        GameRating: action.payload.data,
        GameName: action.payload.data.game_name,
      };
    case FETCH_SINGLE_RATING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_GAME_RATING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GAME_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        rating: action.payload,
        GameName: action.payload.game_name,
      };
    case RESET_RATING_DATA:
      return {
        ...state,
        rating: [],
        GameName: "",
      };
    case FETCH_GAME_RATING_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_UPDATE_RATING:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        rating: action.payload.data.data,
      };
    case ADD_UPDATE_RATING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ATTACHMENT:
      return {
        ...state,
        loading: false,
        rating: state.rating.total_attachment.filter(
          (attachment) =>
            attachment.game_attachment_id !== action.payload.game_attachment_id
        ),
      };

    default:
      return state;
  }
};

export default ratingReducer;
