import produce from "immer";
import { SET_SITES, SET_SITES_LOADING, GET_ALL_APP_MENU } from "./actionTypes";

const initialState = {
  loading: false,
  sites: [],
  appMenuList: [],
};

const sitesReducer = produce((state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SITES_LOADING:
      state.loading = payload;
      break;
    case SET_SITES:
      state.sites = payload;
      break;
    case GET_ALL_APP_MENU:
      state.appMenuList = payload;
      break;
    default:
      return state;
  }
});

export default sitesReducer;
