import { of, concat } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  mergeMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {
  setStatus,
  fetchFulfiled,
  fetchError,
  fetchInfoFulfiled
} from "../redux/actions";
import { SEARCH, GET_USER_INFO, pending } from "../redux/constants";

const searchUsers = query =>
  `https://api.github.com/search/users?q=${query}&type=info`;

const getInfo = query => {
  return `https://api.github.com/users/${query}`;
};

const loadUsers = actions$ => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(300),
    filter(({ payload }) => payload.trim() !== ""),
    switchMap(({ payload }) => {
      return concat(
        of(setStatus(pending)),
        ajax.getJSON(searchUsers(payload)).pipe(
          map(resp => resp.items),
          mergeMap(data => data.map(item => ajax.getJSON(getInfo(item)))),
          map(res => fetchFulfiled(res)),
          catchError(err => {
            return of(fetchError(err.response.message));
          })
        )
      );
    })
  );
};

const userInfo = actions$ => {
  return actions$.pipe(
    ofType(GET_USER_INFO),
    mergeMap(({ payload }) => {
      console.log(payload);
      return concat(
        of(setStatus("panding")),
        ajax.getJSON(getInfo(payload)).pipe(
          debounceTime(300),
          map(resp => fetchInfoFulfiled(resp)),
          catchError(err => {
            return of(fetchError(err.response.message));
          })
        )
      );
    })
  );
};
export const rootEpic = combineEpics(loadUsers, userInfo);
