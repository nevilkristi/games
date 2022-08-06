/**
 *  Name : Sandip Hirpara
 *  Date : 02-12-2021
 */
import {
  FETCH_FILTER,
  FETCH_FILTER_SUCCESS,
  FETCH_FILTER_ERROR,
  SET_GAME_FILTER,
  REMOVE_GAME_FILTER,
  SET_FILTER_BY,
  REMOVE_FILTER_BY,
  SET_GAME_SORTBY,
  REMOVE_ALL_GAME_FILTER,
  LIST_ASSIGNED_FILTER,
  LIST_ASSIGNED_FILTER_SUCCESS,
  LIST_ASSIGNED_FILTER_ERROR,
  REMOVE_ALL_FILTER_BY,
  SET_ICEBREAKER_FAVORITE_FILTER,
  REMOVE_ICEBREAKER_FAVORITE_FILTER,
  SET_SEARCH_FIELD,
  SET_HAS_MORE,
} from "./actionTypes";

const initialState = {
  loading: false,
  filters: [],
  gameFilter: [],
  filterBy: [],
  sortBy: "1",
  favoriteFilter: 0,
  searchField: "",
  hasMore: true,
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_FILTER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FILTER_SUCCESS:
      return {
        ...state,
        filters: payload,
        loading: false,
      };
    case FETCH_FILTER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_GAME_FILTER:
      return {
        ...state,
        gameFilter: [...state.gameFilter, payload],
      };
    case REMOVE_GAME_FILTER:
      return {
        ...state,
        gameFilter: state.gameFilter.filter((item) => item.id !== payload),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: [...state.filterBy, payload],
      };
    case REMOVE_FILTER_BY:
      return {
        ...state,
        filterBy: state.filterBy.filter((item) => item !== payload),
      };
    case SET_GAME_SORTBY:
      return {
        ...state,
        sortBy: payload,
      };
    case REMOVE_ALL_GAME_FILTER:
      return {
        ...state,
        gameFilter: [],
      };
    case LIST_ASSIGNED_FILTER:
      return {
        ...state,
        loading: true,
      };
    case LIST_ASSIGNED_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        filters: payload,
      };
    case LIST_ASSIGNED_FILTER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_ALL_FILTER_BY:
      return {
        ...state,
        filterBy: [],
      };
    case SET_ICEBREAKER_FAVORITE_FILTER:
      return {
        ...state,
        favoriteFilter: 1,
      };
    case REMOVE_ICEBREAKER_FAVORITE_FILTER:
      return {
        ...state,
        favoriteFilter: 0,
      };
    case SET_SEARCH_FIELD:
      return {
        ...state,
        searchField: payload,
      };
    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
