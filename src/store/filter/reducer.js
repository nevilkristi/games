import {
  CREATE_FILTER,
  CREATE_FILTER_SUCCESS,
  CREATE_FILTER_ERROR,
  DELETE_FILTER,
  DELETE_FILTER_SUCCESS,
  DELETE_FILTER_ERROR,
} from "./actionTypes";
const initialState = {
    loading: false,
  }
  
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_FILTER:
        return {
          ...state,
          loading: true,
        };
      case CREATE_FILTER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case CREATE_FILTER_ERROR:
        return {
          ...state,
          loading: false,
        };
      case DELETE_FILTER:
        return {
          ...state,
          loading: true,
        };
      case DELETE_FILTER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DELETE_FILTER_ERROR:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
        
    }
}   

export default filterReducer    