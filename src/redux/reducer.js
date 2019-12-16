import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { actionTypes, pending, success } from "../constants";
const {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_REPOS,
  GET_REPOS_SUCCESS,
  REQUEST_ERROR
} = actionTypes;

function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        state: pending,
        users: null,
        searchedQuery: action.payload
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: state.users
          ? [...state.users, action.payload]
          : [action.payload],
        status: success,
        errorMessage: ""
      };
    case GET_REPOS:
      return {
        ...state,
        status: pending
      };
    case GET_REPOS_SUCCESS:
      return {
        ...state,
        repositories: action.payload,
        status: success
      };
    case REQUEST_ERROR:
      return {
        errorMessage: action.payload
      };
    default:
      return state;
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    reducer
  });
