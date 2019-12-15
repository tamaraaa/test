import { actionTypes } from "./constants";

export const fetchFulfiled = payload => {
  return {
    type: actionTypes.FETCH_FULFILED,
    payload
  };
};
export const fetchError = payload => {
  return {
    type: actionTypes.FETCH_ERROR,
    payload
  };
};

export const setStatus = payload => {
  return {
    type: actionTypes.SET_STATUS,
    payload
  };
};
export const search = payload => {
  return {
    type: actionTypes.SEARCH,
    payload
  };
};
export const currentUser = payload => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload
  };
};

export const getRepos = payload => {
  return {
    type: actionTypes.GET_USER_REPOS,
    payload
  };
};
export const fetchReposFulfiled = payload => {
  return {
    type: actionTypes.FETCH_REPOS_FULFILED,
    payload
  };
};
export const authentication = () => {
  return {
    type: actionTypes.AUTHENTICATE
  };
};
