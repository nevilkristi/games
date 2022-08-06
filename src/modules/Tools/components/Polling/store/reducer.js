
import {
FETCH_POLL,
FETCH_POLL_SUCCESS,
FETCH_POLL_ERROR,
} from "./../store/actionTypes";

const initialState = {
    loading: false,
    randomName: [],
    // loadPollingList:[]
  };

  const fetchRandomNameReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_POLL:
            return {
              ...state,
              loading: true,
            };
          case FETCH_POLL_SUCCESS:
            return {
              ...state,
              loading: false,
              randomName: action.payload,
              // loadPollingList: action.payload.rows[0],
            };
          case FETCH_POLL_ERROR:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      
          default:
            return state;
        }
      };
      
      export default fetchRandomNameReducer;