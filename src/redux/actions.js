import { actionTypes } from "../constants";

export const getUsers = payload => ({
  type: actionTypes.GET_USERS,
  payload
});

export const getUsersSuccess = payload => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload
});

export const getRepos = payload => ({
  type: actionTypes.GET_REPOS,
  payload
});

export const getReposSuccess = payload => ({
  type: actionTypes.GET_REPOS_SUCCESS,
  payload
});

export const auth = () => ({
  type: actionTypes.AUTH
});

export const requestError = payload => ({
  type: actionTypes.REQUEST_ERROR,
  payload
});
