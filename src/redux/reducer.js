import { actionTypes } from "./constants";

const initialState = {
  users: null,
  status: "idle",
  errorMessage: "",
  selectedUser: null,
  usersRepo: null
};

function rootReducer(state = initialState, action) {
  if (action.type === actionTypes.FETCH_FULFILED) {
    return {
      ...state,
      users: state.users ? [...state.users, action.payload] : [action.payload],
      status: "success",
      errorMessage: ""
    };
  }
  if (action.type === actionTypes.SET_STATUS) {
    return {
      ...state,
      status: action.payload
    };
  }
  if (action.type === actionTypes.SEARCH) {
    console.log(action.payload);
    return {
      ...state,
      users: null
    };
  }
  if (action.type === actionTypes.FETCH_ERROR) {
    return {
      ...state,
      status: "failure",
      errorMessage: action.payload
    };
  }

  if (action.type === actionTypes.FETCH_REPOS_FULFILED) {
    console.log(action.payload);
    return {
      ...state,
      usersRepo: action.payload,
      status: "success"
    };
  }
  if (action.type === actionTypes.GET_USER_REPOS) {
    console.log(action.payload);
    return {
      ...state,
      selectedUser: action.payload
    };
  }
  return state;
}

export default rootReducer;
