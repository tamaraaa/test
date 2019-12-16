export const baseUrl = "https://api.github.com";

export const pending = "pending";
export const success = "success";

export const actionTypes = {
  GET_USERS: "GET_USERS",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_REPOS: "GET_REPOS",
  GET_REPOS_SUCCESS: "GET_REPOS_SUCCESS",
  AUTH: "AUTH",
  REQUEST_ERROR: "REQUEST_ERROR"
};

export const url = {
  searchUsersUrl: query => `${baseUrl}/search/users?q=${query}&type=info`,
  getInfoUrl: query => `${baseUrl}/users/${query}`,
  searchRepoUrl: query => `${baseUrl}/users/${query}/repos`
};
