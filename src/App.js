import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "./redux/store";
import Header from "./components/header/Header";
import Search from "./components/search/Search.js";
import RepoList from "./components/repoList/RepoList";

import "./App.scss";

const App = () => {
  return (
    <div>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/repositories" exact component={RepoList} />
        </Switch>
        <Redirect to="/" />
      </ConnectedRouter>
    </div>
  );
};

export default App;
