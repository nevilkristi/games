import { axiosGame } from "services/api";
import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_ERROR,
  FETCH_MY_GAME,
  FETCH_MY_GAME_SUCCESS,
  FETCH_MY_GAME_ERROR,
  FETCH_SINGLE_GAME,
  FETCH_SINGLE_GAME_SUCCESS,
  FETCH_SINGLE_GAME_ERROR,
  DELETE_USER_GAME_ERROR,
  DELETE_USER_GAME_SUCCESS,
  FETCH_FILTERED_GAME,
  FETCH_FILTERED_GAME_SUCCESS,
  FETCH_FILTERED_GAME_ERROR,
  FETCH_PLAYED_GAME,
  FETCH_PLAYED_GAME_SUCCESS,
  FETCH_PLAYED_GAME_ERROR,
  ADD_UPDATE_PLAYED_GAME_SUCCESS,
  ADD_UPDATE_PLAYED_GAME_ERROR,
  FETCH_FAVORITE_GAME_SUCCESS,
  FETCH_FAVORITE_GAME_ERROR,
  ADD_UPDATE_FAVORITE_GAME_SUCCESS,
  ADD_UPDATE_FAVORITE_GAME_ERROR,
  DELETE_GAME_ATTACHMENT_SUCCESS,
  DELETE_GAME_ATTACHMENT_ERROR,
  SET_GALLERY_SHOW,
  REMOVE_PLAYED_GAME,
  VIEW_GAME_SUCCESS,
  VIEW_GAME_ERROR,
  REMOVE_FAVORITE_GAME,
  SET_PREVIOUS_URL,
  GET_FEATURED_CARD_SUCCESS,
  GET_FEATURED_CARD_ERROR,
  REPORT_ATTACHMENT_SUCCESS,
  REPORT_ATTACHMENT_ERROR,
  FETCH_GAME_LINK_SUCCESS,
  FETCH_GAME_LINK_ERROR,
} from "./actionTypes";

import {
  DELETE_GAME_ATTACHMENT_URL,
  ADD_UPDATE_FAVORITE_GAME_URL,
  FETCH_FAVORITE_GAME_URL,
  ADD_UPDATE_PLAYED_GAME_URL,
  FETCH_PLAYED_GAME_URL,
  FETCH_MY_GAME_URL,
  ADD_UPDATE_GAME_URL,
  FETCH_MY_GAME_BY_ID_URL,
  DELETE_USER_GAME_URL,
  FETCH_GAME_FILTER_URL,
  VIEW_GAME_URL,
  LIST_FEATURED_CARD_URL,
  REPORT_ATTACHMENT_URL,
  FETCH_SHARE_GAME_URL,
} from "constants/urls";

export const createGame = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_GAME_URL, data);
      if (res.data?.data) {
        dispatch(createGameSuccess(res.data.data));
        cb(res.data.data);
        dispatch(
          fetchFilteredGame({
            sort: 1,
            sort_order: "DESC",
            page_record: 20,
            page_no: 1,
            filter_id: [],
            search: "",
            generated_game_id: [],
            filter_by: [],
          })
        );
      }
    } catch (err) {
      dispatch(createGameError(err.response?.data?.message || err.message));
    }
  };
};

export const createGameError = (message) => ({
  type: CREATE_GAME_ERROR,
  payload: message,
});
export const createGameSuccess = (data) => ({
  type: CREATE_GAME_SUCCESS,
  payload: data,
});

export const fetchMyGame = (data, is_refresh = false) => {
  return async (dispatch) => {
    try {
      dispatch(fetchMyGamesLoading());
      const res = await axiosGame.post(FETCH_MY_GAME_URL, data);
      if (res?.data?.data) {
        dispatch(fetchMyGameSuccess(res.data.data, is_refresh));
      }
    } catch (err) {
      dispatch(fetchMyGameError(err.response?.data?.message || err.message));
    }
  };
};

export const fetchMyGamesLoading = () => ({
  type: FETCH_MY_GAME,
});

export const fetchMyGameError = (message) => ({
  type: FETCH_MY_GAME_ERROR,
  payload: message,
});

export const fetchMyGameSuccess = (data, is_refresh) => ({
  type: FETCH_MY_GAME_SUCCESS,
  payload: { data: data, is_refresh: is_refresh },
});

export const fetchSingleGame = (data, loading = true) => {
  return async (dispatch) => {
    try {
      loading && dispatch(fetchSingleGameLoading(true));
      const res = await axiosGame.get(FETCH_MY_GAME_BY_ID_URL + `${data}`);
      if (res.data?.data) {
        dispatch(fetchSingleGameSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchSingleGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchSingleGameLoading = (message) => ({
  type: FETCH_SINGLE_GAME,
  payload: message,
});

export const fetchSingleGameError = (message) => ({
  type: FETCH_SINGLE_GAME_ERROR,
  payload: message,
});

export const fetchSingleGameSuccess = (data) => ({
  type: FETCH_SINGLE_GAME_SUCCESS,
  payload: data,
});

export const deleteUserGame = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.delete(`${DELETE_USER_GAME_URL}/${data}`);
      if (res.data?.data) {
        dispatch(deleteUserGameSuccess(data));
        cb();
        // dispatch(fetchMyGame());
      }
    } catch (err) {
      dispatch(deleteUserGameError(err.response?.data?.message || err.message));
    }
  };
};

export const deleteUserGameError = (message) => ({
  type: DELETE_USER_GAME_ERROR,
  payload: message,
});

export const deleteUserGameSuccess = (data) => ({
  type: DELETE_USER_GAME_SUCCESS,
  payload: data,
});

export const fetchFilteredGame = (data, isFresh, cb = () => {}) => {
  return async (dispatch) => {
    try {
      isFresh && dispatch(fetchFilteredGameLoading());
      const res = await axiosGame.post(FETCH_GAME_FILTER_URL, data);
      if (res.data?.data) {
        dispatch(fetchFilteredGameSuccess(res.data.data, isFresh));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(
        fetchFilteredGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchFilteredGameLoading = () => ({
  type: FETCH_FILTERED_GAME,
});

export const fetchFilteredGameError = (message) => ({
  type: FETCH_FILTERED_GAME_ERROR,
  payload: message,
});

export const fetchFilteredGameSuccess = (data, isFresh) => ({
  type: FETCH_FILTERED_GAME_SUCCESS,
  payload: { rows: data, is_refresh: isFresh },
});

export const fetchPlayedGame = (data, is_refresh = false) => {
  return async (dispatch) => {
    try {
      dispatch(fetchMyGamesLoading());
      const res = await axiosGame.post(FETCH_PLAYED_GAME_URL, data);
      if (res?.data?.data) {
        dispatch(fetchPlayedGameSuccess(res.data.data, is_refresh));
        dispatch(fetchPlayedGameLoading());
      }
    } catch (err) {
      dispatch(
        fetchPlayedGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchPlayedGameLoading = () => ({
  type: FETCH_PLAYED_GAME,
});

export const fetchPlayedGameError = (message) => ({
  type: FETCH_PLAYED_GAME_ERROR,
  payload: message,
});

export const fetchPlayedGameSuccess = (data, is_refresh) => ({
  type: FETCH_PLAYED_GAME_SUCCESS,
  // payload: { rows: data, is_refresh: is_refresh },
  payload: { data: data, is_refresh: is_refresh },
});

export const addUpdatePlayedGame = (data, location) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_PLAYED_GAME_URL, data);
      if (res.data?.data) {
        dispatch(addUpdatePlayedGameSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        addUpdatePlayedGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const addUpdatePlayedGameError = (message) => ({
  type: ADD_UPDATE_PLAYED_GAME_ERROR,
  payload: message,
});

export const addUpdatePlayedGameSuccess = (data) => ({
  type: ADD_UPDATE_PLAYED_GAME_SUCCESS,
  payload: data,
});

export const fetchFavoriteGame = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(FETCH_FAVORITE_GAME_URL, data);
      if (res.data?.data) {
        dispatch(fetchFavoriteGameSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        fetchFavoriteGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const fetchFavoriteGameError = (message) => ({
  type: FETCH_FAVORITE_GAME_ERROR,
  payload: message,
});

export const fetchFavoriteGameSuccess = (data) => ({
  type: FETCH_FAVORITE_GAME_SUCCESS,
  payload: data,
});

export const removeFavoriteGames = (gameId) => ({
  type: REMOVE_FAVORITE_GAME,
  payload: gameId,
});

export const addUpdateFavoriteGame = (data, location) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(ADD_UPDATE_FAVORITE_GAME_URL, data);
      if (res.data?.data) {
        dispatch(addUpdateFavoriteGameSuccess(data));
        dispatch(
          fetchPlayedGame({
            game_id: data.game_id,
            is_favourite: data.is_favourite,
          })
        );
      }
    } catch (err) {
      dispatch(
        addUpdateFavoriteGameError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const addUpdateFavoriteGameError = (message) => ({
  type: ADD_UPDATE_FAVORITE_GAME_ERROR,
  payload: message,
});

export const addUpdateFavoriteGameSuccess = (data) => ({
  type: ADD_UPDATE_FAVORITE_GAME_SUCCESS,
  payload: data,
});

export const deleteGameAttachment = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.delete(
        `${DELETE_GAME_ATTACHMENT_URL}/${data}`
      );
      if (res.data?.data) {
        dispatch(deleteGameAttachmentSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(
        deleteGameAttachmentError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const deleteGameAttachmentError = (message) => ({
  type: DELETE_GAME_ATTACHMENT_ERROR,
  payload: message,
});

export const deleteGameAttachmentSuccess = (data) => ({
  type: DELETE_GAME_ATTACHMENT_SUCCESS,
  payload: data,
});

export const setGameGalleryShowItem = (data) => ({
  type: SET_GALLERY_SHOW,
  payload: data,
});

export const removePlayedGame = (data) => {
  return {
    type: REMOVE_PLAYED_GAME,
    payload: data,
  };
};

export const viewGame = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(VIEW_GAME_URL, data);
      if (res?.data) {
        dispatch(viewGameSuccess(res.data.data));
      }
    } catch (err) {
      dispatch(viewGameError(err.response?.data?.message || err.message));
    }
  };
};

export const viewGameError = (message) => ({
  type: VIEW_GAME_ERROR,
  payload: message,
});

export const viewGameSuccess = (data) => ({
  type: VIEW_GAME_SUCCESS,
  payload: data,
});

export const setPreviousUrl = (data) => ({
  type: SET_PREVIOUS_URL,
  payload: data,
});

export const getFeaturedCard = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(LIST_FEATURED_CARD_URL, data);
      if (res?.data) {
        dispatch(getFeaturedCardSuccess(res.data.data.rows));
      }
    } catch (err) {
      dispatch(
        getFeaturedCardError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const getFeaturedCardError = (message) => ({
  type: GET_FEATURED_CARD_ERROR,
  payload: message,
});

export const getFeaturedCardSuccess = (data) => ({
  type: GET_FEATURED_CARD_SUCCESS,
  payload: data,
});

export const reportAttachment = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.post(REPORT_ATTACHMENT_URL, {
        game_attachment_id: data.game_attachment_id,
      });
      if (res?.data) {
        dispatch(reportAttachmentSuccess(res.data.data));
        // dispatch(updateAttachment(res.data.data));
        cb(data.gameId);
      }
    } catch (err) {
      dispatch(
        reportAttachmentError(err.response?.data?.message || err.message)
      );
    }
  };
};

export const reportAttachmentError = (message) => ({
  type: REPORT_ATTACHMENT_ERROR,
  payload: message,
});

export const reportAttachmentSuccess = (data) => ({
  type: REPORT_ATTACHMENT_SUCCESS,
  payload: data,
});

export const FetchGameLink = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axiosGame.get(FETCH_SHARE_GAME_URL + `/${data}`);
      if (res?.data) {
        dispatch(FetchGameLinkSuccess(res.data.data));
        cb(res.data.data);
      }
    } catch (err) {
      dispatch(FetchGameLinkError(err.response?.data?.message || err.message));
    }
  };
};

export const FetchGameLinkError = (message) => ({
  type: FETCH_GAME_LINK_ERROR,
  payload: message,
});

export const FetchGameLinkSuccess = (data) => ({
  type: FETCH_GAME_LINK_SUCCESS,
  payload: data,
});
