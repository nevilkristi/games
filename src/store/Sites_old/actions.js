import { GET_SITES } from "constants/urls";
import { axiosGame } from "services/api";
import { SET_SITES, SET_SITES_LOADING } from "./actionTypes";

export const fetchSites = () => async (dispatch) => {
  try {
    dispatch(setLoadingSites(true));
    const res = await axiosGame.get(GET_SITES);

    if (res.status) {
      if (res.data?.data?.siteList) {
        dispatch(setSites(res.data.data.siteList));
      }
      dispatch(setLoadingSites(false));
    }
  } catch (err) {
    dispatch(setLoadingSites(false));
  }
};

export const setLoadingSites = (data) => ({
  type: SET_SITES_LOADING,
  payload: data,
});

export const setSites = (data) => ({
  type: SET_SITES,
  payload: data,
});
