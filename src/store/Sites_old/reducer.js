import produce from "immer";
import { SET_SITES, SET_SITES_LOADING } from "./actionTypes";

const initialState = {
  loading: false,
  sites: [],
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
    default:
      return state;
  }
});

export default sitesReducer;
