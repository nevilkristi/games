import produce from "immer";
import {
  SET_PAGE_DETAILS,
  REMOVE_PAGE_DETAILS,
  GET_PAGE_DETAILS,
  GET_PAGE_DETAILS_SUCCESS,
  GET_PAGE_DETAILS_ERROR,
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR,
  SEEN_NOTIFICATION,
  SEEN_NOTIFICATION_SUCCESS,
  SEEN_NOTIFICATION_ERROR,
  SEEN_ALL_NOTIFICATION,
  SEEN_ALL_NOTIFICATION_SUCCESS,
  SEEN_ALL_NOTIFICATION_ERROR,
  GET_ALL_TUTORIAL,
  GET_ALL_TUTORIAL_SUCCESS,
  GET_ALL_TUTORIAL_ERROR,
  GET_ALL_FAQ,
  GET_ALL_FAQ_SUCCESS,
  GET_ALL_FAQ_ERROR,
  SET_TUTORIAL_DATA,
  GET_TUTORIAL_DETAIL,
  GET_TUTORIAL_DETAIL_SUCCESS,
  GET_TUTORIAL_DETAIL_ERROR,
  GET_SYSTEM_CONFIGURATION,
  GET_SYSTEM_CONFIGURATION_SUCCESS,
  GET_SYSTEM_CONFIGURATION_ERROR,
} from "./actionTypes";

const initialState = {
  pageDetails: 0,
  Notification: [],
  NotificationCount: 0,
  NotificationBadgeCount: 0,
  Tutorials: [],
  FAQs: [],
  Tutorial: {},
  loadingTutorial: false,
  Policy: {},
};

const miscellaneousReducer = produce((state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PAGE_DETAILS:
      state.pageDetails = payload;
      break;
    case REMOVE_PAGE_DETAILS:
      state.pageDetails = 0;
      break;
    case GET_PAGE_DETAILS:
      state.loading = true;
      break;
    case GET_PAGE_DETAILS_SUCCESS:
      state.loading = false;
      state.pageDetails = payload.pageLinkData;
      break;
    case GET_PAGE_DETAILS_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case GET_NOTIFICATION:
      state.loading = true;
      break;
    case GET_NOTIFICATION_SUCCESS:
      state.loading = false;
      state.Notification = [...state.Notification, ...payload.rows];
      state.NotificationCount = payload.count;
      state.NotificationBadgeCount = payload.badge_count;
      break;
    case GET_NOTIFICATION_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case SEEN_NOTIFICATION:
      state.loading = true;
      break;
    case SEEN_NOTIFICATION_SUCCESS:
      state.loading = false;
      state.Notification = state.Notification.map((item) => {
        if (item.notification_id === payload) {
          item.is_seen = 1;
        }
        return item;
      });
      break;
    case SEEN_NOTIFICATION_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case SEEN_ALL_NOTIFICATION:
      state.loading = true;
      break;
    case SEEN_ALL_NOTIFICATION_SUCCESS:
      state.loading = false;
      state.Notification = state.Notification.map((item) => {
        item.is_seen = 1;
        return item;
      });
      break;
    case SEEN_ALL_NOTIFICATION_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case GET_ALL_TUTORIAL:
      state.loadingTutorial = true;
      break;
    case GET_ALL_TUTORIAL_SUCCESS:
      state.loadingTutorial = false;
      state.Tutorials = payload.rows;
      break;
    case GET_ALL_TUTORIAL_ERROR:
      state.loadingTutorial = false;
      state.error = payload;
      break;
    case GET_ALL_FAQ:
      state.loading = true;
      break;
    case GET_ALL_FAQ_SUCCESS:
      state.loading = false;
      state.FAQs = payload.rows;
      break;
    case GET_ALL_FAQ_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case SET_TUTORIAL_DATA:
      state.Tutorial = payload;
      break;
    case GET_TUTORIAL_DETAIL:
      state.loading = true;
      break;
    case GET_TUTORIAL_DETAIL_SUCCESS:
      state.loading = false;
      state.Tutorial = payload.data;
      break;
    case GET_TUTORIAL_DETAIL_ERROR:
      state.loading = false;
      state.error = payload;
      break;
    case GET_SYSTEM_CONFIGURATION:
      state.loading = true;
      break;
    case GET_SYSTEM_CONFIGURATION_SUCCESS:
      state.loading = false;
      state.Policy = payload;
      break;
    case GET_SYSTEM_CONFIGURATION_ERROR:
      state.loading = false;
      state.error = payload;
      break;

    default:
      return state;
  }
});

export default miscellaneousReducer;
