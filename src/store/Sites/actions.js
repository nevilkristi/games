import { GET_SITES, LIST_ALL_APP_MENU } from "constants/urls";
import { axiosAccounts } from "services/api";
import { SET_SITES, SET_SITES_LOADING, GET_ALL_APP_MENU } from "./actionTypes";

export const fetchSites = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axiosAccounts.get(GET_SITES);
    if (res.status) {
      if (res.data?.data?.siteList) {
        dispatch(setSites(res.data.data.siteList));
      }
      dispatch(setLoading(false));
    }
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const getAllMenuList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axiosAccounts.post(LIST_ALL_APP_MENU, data);
    if (res.status) {
      if (res.data?.data?.application_menu) {
        dispatch(setAllMenuList(res.data.data.application_menu));
      }
      dispatch(setLoading(false));
    }
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const setLoading = (data) => ({
  type: SET_SITES_LOADING,
  payload: data,
});

export const setSites = (data) => ({
  type: SET_SITES,
  payload: data,
});

export const setAllMenuList = (data) => ({
  type: GET_ALL_APP_MENU,
  payload: data,
});