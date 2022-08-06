import {
  FETCH_TOOL_LIST,
  FETCH_TOOL_LIST_SUCCESS,
  FETCH_TOOL_LIST_ERROR,
  FETCH_TOOL_OPTIONS,
  FETCH_TOOL_OPTIONS_SUCCESS,
  FETCH_TOOL_OPTIONS_ERROR,
  DELETE_TOOL_LIST,
  DELETE_TOOL_LIST_SUCCESS,
  DELETE_TOOL_LIST_ERROR,
  DELETE_TOOL_OPTIONS,
  DELETE_TOOL_OPTIONS_SUCCESS,
  DELETE_TOOL_OPTIONS_ERROR,
  SAVE_TOOL_LIST,
  SAVE_TOOL_LIST_SUCCESS,
  SAVE_TOOL_LIST_ERROR,
  GET_POLL_LIST,
  GET_POLL_LIST_SUCCESS,
  GET_POLL_LIST_ERROR,
  CLEAR_STORE,
  GET_SYSTEM_CONFIGURATION_SUCCESS,
  CLEAR_NAME,
} from "./actionTypes";

const initialState = {
  loading: false,
  tools: [],
  toolOptions: [],
  pollList: [],
  toolName: {},
  colorList: [],
  colorList2: [],
};

const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOOL_LIST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOOL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tools: action.payload.rows !== undefined ? action.payload.rows : [],
        // toolName: {},
      };
    case FETCH_TOOL_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TOOL_OPTIONS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOOL_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        toolOptions: action.payload.option,
        // toolName:{}
      };
    case FETCH_TOOL_OPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        tools: [],
        toolOptions: [],
        // toolName:{},
        error: action.payload,
      };
    //Save List
    case SAVE_TOOL_LIST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_TOOL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        toolName: action.payload,
        // randomName: action.payload,
        // toolOptions:action.payload
      };
    case SAVE_TOOL_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TOOL_LIST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TOOL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // randomName: action.payload,
      };
    case DELETE_TOOL_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TOOL_OPTIONS:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TOOL_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        // randomName: action.payload,
      };
    case DELETE_TOOL_OPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_POLL_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_POLL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pollList: action.payload.rows,
      };
    case GET_POLL_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_STORE:
      return {
        ...state,
        toolOptions: [],
        toolName: {},
        tools: [],
      };
    case GET_SYSTEM_CONFIGURATION_SUCCESS:
      return {
        ...state,
        colorList: action.payload.colorList,
        colorList2: action.payload.colorList2,
      };
    case CLEAR_NAME:
      return {
        ...state,
        toolName: {},
      };
    default:
      return state;
  }
};

export default toolReducer;
