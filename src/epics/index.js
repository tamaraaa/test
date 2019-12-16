import { of, from } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { push } from "connected-react-router";
import {
  map,
  switchMap,
  debounceTime,
  catchError,
  mergeMap,
  take
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {
  getUsersSuccess,
  requestError,
  getReposSuccess
} from "../redux/actions";
import { actionTypes, baseUrl, clientID, clientSecret } from "../constants";

const authUrl = `${baseUrl}/users/tamaraaa?client_id=${clientID}&client_secret=${clientSecret}`;
const searchUsersUrl = query => `${baseUrl}/search/users?q=${query}&type=info`;
const getInfoUrl = query => `${baseUrl}/users/${query}`;
const searchRepoUrl = query => `${baseUrl}/users/${query}/repos`;

const authenticateEpic = actions$ =>
  actions$.pipe(
    ofType(actionTypes.AUTH),
    mergeMap(() =>
      ajax.getJSON(authUrl).pipe(
        map(data => data),
        catchError(({ response }) => of(requestError(response.message)))
      )
    )
  );

const loadUsers = actions$ =>
  actions$.pipe(
    ofType(actionTypes.GET_USERS),
    debounceTime(300),
    switchMap(({ payload }) =>
      ajax.getJSON(searchUsersUrl(payload)).pipe(
        mergeMap(res =>
          from(res.items).pipe(
            take(2),
            mergeMap(({ login }) =>
              ajax.getJSON(getInfoUrl(login)).pipe(
                map(getUsersSuccess),
                catchError(({ response }) => of(requestError(response.message)))
              )
            )
          )
        ),
        catchError(({ response }) => of(requestError(response.message)))
      )
    )
  );

const loadRepos = actions$ =>
  actions$.pipe(
    ofType(actionTypes.GET_REPOS),
    mergeMap(({ payload }) =>
      ajax.getJSON(searchRepoUrl(payload)).pipe(
        map(res =>
          getReposSuccess(
            res.map(repo => ({
              id: repo.id,
              owner: repo.owner,
              name: repo.name.toUpperCase(),
              description: repo.description,
              created_at: repo.created_at,
              forks_count: repo.forks_count,
              watchers_count: repo.watchers_count,
              stargazers_count: repo.stargazers_count,
              html_url: repo.html_url
            }))
          )
        ),
        catchError(({ response }) => of(requestError(response.message)))
      )
    )
  );

const goToRepos = actions$ =>
  actions$.pipe(
    ofType(actionTypes.GET_REPOS),
    map(() => push("/repositories"))
  );

const handleError = actions$ =>
  actions$.pipe(
    ofType(actionTypes.REQUEST_ERROR),
    map(() => push("/"))
  );

export const rootEpic = combineEpics(
  loadUsers,
  loadRepos,
  authenticateEpic,
  goToRepos,
  handleError
);
