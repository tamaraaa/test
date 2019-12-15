import { of, concat, from } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  mergeMap,
  take
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {
  setStatus,
  fetchFulfiled,
  fetchError,
  fetchReposFulfiled
} from "../redux/actions";
import { actionTypes, pending } from "../redux/constants";

const searchUsers = query =>
  `https://api.github.com/search/users?q=${query}&type=info`;

const getInfo = query => {
  return `https://api.github.com/users/${query}`;
};
const searchRepo = query => {
  return `https://api.github.com/users/${query}/repos`;
};

const authenticateEpic = actions$ =>
  actions$.pipe(
    ofType(actionTypes.AUTHENTICATE),
    mergeMap(action =>
      ajax.getJSON(
        "https://api.github.com/users/tamaraaa?client_id=Iv1.0d75bfe16962a9bc&client_secret=8dbcea4902546d5ba22c633cf4ad69da4f01f0b6"
      )
    )
  );

const loadUsers = actions$ => {
  return actions$.pipe(
    ofType(actionTypes.SEARCH),
    debounceTime(300),
    filter(({ payload }) => payload.trim() !== ""),
    switchMap(({ payload }) =>
      concat(
        of(setStatus(pending)),
        ajax.getJSON(searchUsers(payload)).pipe(
          mergeMap(res =>
            from(res.items).pipe(
              take(2),
              mergeMap(({ login }) =>
                ajax.getJSON(getInfo(login)).pipe(
                  map(res => fetchFulfiled(res)),
                  catchError(err => {
                    return of(fetchError(err.response.message));
                  })
                )
              )
            )
          ),
          catchError(err => {
            return of(fetchError(err.response.message));
          })
        )
      )
    )
  );
};
const loadRepos = actions$ => {
  return actions$.pipe(
    ofType(actionTypes.GET_USER_REPOS),
    mergeMap(({ payload }) => {
      return concat(
        of(setStatus(pending)),
        ajax.getJSON(searchRepo(payload)).pipe(
          debounceTime(300),
          map(resp => fetchReposFulfiled(resp)),
          catchError(err => {
            return of(fetchError(err.response.message));
          })
        )
      );
    })
  );
};
export const rootEpic = combineEpics(loadUsers, loadRepos, authenticateEpic);
