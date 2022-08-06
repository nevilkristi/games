import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_ERROR,
  FETCH_MY_GAME,
  FETCH_MY_GAME_SUCCESS,
  FETCH_MY_GAME_ERROR,
  FETCH_SINGLE_GAME,
  FETCH_SINGLE_GAME_SUCCESS,
  FETCH_SINGLE_GAME_ERROR,
  FETCH_FILTERED_GAME,
  FETCH_FILTERED_GAME_SUCCESS,
  FETCH_FILTERED_GAME_ERROR,
  FETCH_PLAYED_GAME,
  FETCH_PLAYED_GAME_SUCCESS,
  FETCH_PLAYED_GAME_ERROR,
  ADD_UPDATE_PLAYED_GAME,
  ADD_UPDATE_PLAYED_GAME_SUCCESS,
  ADD_UPDATE_PLAYED_GAME_ERROR,
  FETCH_FAVORITE_GAME,
  FETCH_FAVORITE_GAME_SUCCESS,
  FETCH_FAVORITE_GAME_ERROR,
  ADD_UPDATE_FAVORITE_GAME,
  ADD_UPDATE_FAVORITE_GAME_SUCCESS,
  ADD_UPDATE_FAVORITE_GAME_ERROR,
  DELETE_GAME_ATTACHMENT,
  DELETE_GAME_ATTACHMENT_SUCCESS,
  DELETE_GAME_ATTACHMENT_ERROR,
  SET_GALLERY_SHOW,
  REMOVE_PLAYED_GAME,
  VIEW_GAME,
  VIEW_GAME_SUCCESS,
  VIEW_GAME_ERROR,
  DELETE_USER_GAME,
  DELETE_USER_GAME_ERROR,
  DELETE_USER_GAME_SUCCESS,
  REMOVE_FAVORITE_GAME,
  SET_PREVIOUS_URL,
  GET_FEATURED_CARD,
  GET_FEATURED_CARD_SUCCESS,
  GET_FEATURED_CARD_ERROR,
} from "./actionTypes";

const initialState = {
  loading: false,
  loadingGame: false,
  loadingMyGame: false,
  loadingPlayedGame: false,
  loadingSingleGame: false,
  Game: [],
  MyGameCount: 0,
  PlayedGameCount: 0,
  SingleGame: {},
  PlayedGame: [],
  FavoriteGame: [],
  FilteredGame: [],
  TotalFilteredGame: 0,
  GalleryShow: false,
  historyUrl: "",
  FeaturedCard: [],
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GAME:
      return {
        ...state,
        loading: true,
      };
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        Game: payload,
      };
    case CREATE_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case FETCH_MY_GAME:
      return {
        ...state,
        loadingMyGame: true,
      };
    case FETCH_MY_GAME_SUCCESS:
      return {
        ...state,
        loadingMyGame: false,
        Game: payload.is_refresh
          ? [...state.Game, ...payload.data.rows]
          : payload.data.rows !== undefined
          ? payload.data.rows
          : [],
        MyGameCount: payload.data.count,
      };
    case FETCH_MY_GAME_ERROR:
      return {
        ...state,
        loadingMyGame: false,
      };
    case FETCH_SINGLE_GAME:
      return {
        ...state,
        loadingSingleGame: payload,
        SingleGame: payload ? [] : {},
      };
    case FETCH_SINGLE_GAME_SUCCESS:
      return {
        ...state,
        loadingSingleGame: false,
        SingleGame: payload.game_id
          ? payload
          : { token: payload.token, no_data: true },
      };
    case FETCH_SINGLE_GAME_ERROR:
      return {
        ...state,
        loadingSingleGame: false,
      };
    case FETCH_FILTERED_GAME:
      return {
        ...state,
        loadingGame: true,
      };
    case FETCH_FILTERED_GAME_SUCCESS:
      return {
        ...state,
        loadingGame: false,
        SingleGame: [],
        FilteredGame: payload.is_refresh
          ? payload.rows.rows
          : [...state.FilteredGame, ...payload.rows.rows],
        TotalFilteredGame: payload.rows.count,
      };
    case FETCH_FILTERED_GAME_ERROR:
      return {
        ...state,
        loadingGame: false,
      };
    case FETCH_PLAYED_GAME:
      return {
        ...state,
        loadingPlayedGame: true,
      };
    case FETCH_PLAYED_GAME_SUCCESS:
      return {
        ...state,
        loadingPlayedGame: false,
        PlayedGame: payload.is_refresh
          ? [...state.Game, ...payload.data.rows]
          : payload.data.rows !== undefined
          ? payload.data.rows
          : [],
        PlayedGameCount: payload.data.count,
      };
    case FETCH_PLAYED_GAME_ERROR:
      return {
        ...state,
        loadingPlayedGame: false,
      };
    case ADD_UPDATE_PLAYED_GAME:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_PLAYED_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        PlayedGame: payload.game.rows,
      };
    case ADD_UPDATE_PLAYED_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case FETCH_FAVORITE_GAME:
      return {
        ...state,
        loading: true,
        FavoriteGame: [],
      };
    case FETCH_FAVORITE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        FavoriteGame: payload.rows !== undefined ? payload.rows : [],
      };
    case FETCH_FAVORITE_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_FAVORITE_GAME:
      return {
        ...state,
        FavoriteGame: state.FavoriteGame.filter((i) => i.game_id !== payload),
      };
    case ADD_UPDATE_FAVORITE_GAME:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_FAVORITE_GAME_SUCCESS:
      return {
        ...state,
        Game: state.Game.map((game) => {
          if (game.game_id === payload.game_id) {
            game.is_favourite = payload.is_favourite;
          }
          return game;
        }),
      };
    case ADD_UPDATE_FAVORITE_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_GAME_ATTACHMENT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_GAME_ATTACHMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_GAME_ATTACHMENT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_GALLERY_SHOW:
      return {
        ...state,
        GalleryShow: payload,
      };
    case REMOVE_PLAYED_GAME:
      return {
        ...state,
        PlayedGame: state.PlayedGame.filter((game) => game.game_id !== payload),
      };
    case VIEW_GAME:
      return {
        ...state,
        loading: true,
      };
    case VIEW_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case VIEW_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_GAME:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_GAME_SUCCESS:
      return {
        ...state,
        Game: state.Game.filter((game) => game.game_id !== payload),
        PlayedGame: state.PlayedGame.filter((game) => game.game_id !== payload),
        FavoriteGame: state.FavoriteGame.filter(
          (game) => game.game_id !== payload
        ),
        loading: false,
      };
    case DELETE_USER_GAME_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_PREVIOUS_URL:
      return {
        ...state,
        historyUrl: payload,
      };
    case GET_FEATURED_CARD:
      return {
        ...state,
        loading: true,
      };
    case GET_FEATURED_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        FeaturedCard: payload,
      };
    case GET_FEATURED_CARD_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default gameReducer;
