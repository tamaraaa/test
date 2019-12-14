import {
  SEARCH,
  FETCH_ERROR,
  FETCH_DATA,
  SET_STATUS,
  FETCH_FULFILED,
  SET_CURRENT_USER,
  GET_USER_INFO,
  FETCH_INFO_FULFILED
} from "./constants";

export const fetchFulfiled = payload => {
  console.log(payload);
  return {
    type: FETCH_FULFILED,
    payload
  };
};
export const fetchError = payload => {
  return {
    type: FETCH_ERROR,
    payload
  };
};
export const fetchData = () => {
  return {
    type: FETCH_DATA
  };
};
export const setStatus = payload => {
  return {
    type: SET_STATUS,
    payload
  };
};
export const search = payload => {
  return {
    type: SEARCH,
    payload
  };
};
export const currentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload
  };
};
export const getUserInfo = payload => {
  return {
    type: GET_USER_INFO,
    payload
  };
};
export const fetchInfoFulfiled = payload => {
  return {
    type: FETCH_INFO_FULFILED,
    payload
  };
};
