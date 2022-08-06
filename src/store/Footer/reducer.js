import {
  SET_LOADING,
  GET_SYSTEM_PAGE_DETAIL,
  GET_ALL_FOOTER_MENU,
} from "./actionTypes";

import produce from "immer";

const initialState = {
  loading: true,
  systemPageDetail: [],
  footerMenu: [],
  page: 1,
  page_record: 10,
  total_records: 0,
};

const footerReducer = produce((state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      state.loading = payload;
      break;
    case GET_SYSTEM_PAGE_DETAIL:
      state.systemPageDetail = payload;
      break;
    case GET_ALL_FOOTER_MENU:
      state.footerMenu = payload;
      break;
    default:
      return state;
  }
});

export default footerReducer;
