import { axiosAccounts } from "services/api";
import {
  SET_LOADING,
  GET_SYSTEM_PAGE_DETAIL,
  GET_ALL_FOOTER_MENU,
} from "./actionTypes";
import { GET_SYSTEM_PAGE_DETAIL_URL, LIST_ALL_APP_MENU } from "constants/urls";

// get footer contect
export const getSystemPageDetailData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosAccounts.post(GET_SYSTEM_PAGE_DETAIL_URL, data);
      if (res?.data?.data) {
        dispatch(getFooterContentList(res.data.data));
      }
      dispatch(setLoading(false));
    } catch (err) {
      //toast.error(err.response?.data?.message || err.message);
      dispatch(setLoading(false));
    }
  };
};

/** App Footer Menu list */
export const getAllFooterMenuList = (data) => async (dispatch) => {
  try {
    const res = await axiosAccounts.post(LIST_ALL_APP_MENU, data);
    if (res.status) {
      if (res.data?.data?.application_menu) {
        dispatch(setAllFooterMenuList(res.data.data.application_menu));
      }
    }
  } catch (err) {}
};

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});

export const setAllFooterMenuList = (data) => ({
  type: GET_ALL_FOOTER_MENU,
  payload: data,
});

export const getFooterContentList = (data) => ({
  type: GET_SYSTEM_PAGE_DETAIL,
  payload: data,
});
