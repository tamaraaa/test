import { FETCH_FULFILED } from "./constants";
import { SET_STATUS } from "./constants";
import { FETCH_DATA } from "./constants";
import {
  SEARCH,
  FETCH_ERROR,
  SET_CURRENT_USER,
  GET_USER_INFO,
  FETCH_INFO_FULFILED
} from "./constants";

const initialState = {
  users: null,
  status: "idle",
  errorMessage: "",
  selectedUser: null,
  usersRepo: null
};

function rootReducer(state = initialState, action) {
  if (action.type === FETCH_FULFILED) {
    return {
      ...state,
      users: action.payload.slice(0, 10),
      status: "success",
      errorMessage: ""
    };
  }
  if (action.type === FETCH_DATA) {
    return {
      ...state
    };
  }
  if (action.type === SET_STATUS) {
    return {
      ...state,
      status: action.payload
    };
  }
  if (action.type === SEARCH) {
    console.log(action.payload);
    return {
      ...state,
      users: null,
      status: "pennding"
    };
  }
  if (action.type === FETCH_ERROR) {
    console.log(action.payload);
    return {
      ...state,
      status: "failure",
      errorMessage: action.payload
    };
  }
  if (action.type === FETCH_INFO_FULFILED) {
    console.log(action.payload);
    return {
      ...state,
      selectedUser: action.payload,
      status: "success"
    };
  }
  if (action.type === GET_USER_INFO) {
    console.log(action.payload);
    return {
      ...state
    };
  }
  return state;
}

export default rootReducer;
