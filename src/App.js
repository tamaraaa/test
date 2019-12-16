import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";

import { history } from "./redux/store";
import { auth } from "./redux/actions";
import Header from "./components/header/Header";
import Search from "./components/search/Search.js";
import RepoList from "./components/repoList/RepoList";

const App = ({ authenticate }) => {
  useEffect(() => {
    authenticate();
  }, [authenticate]);

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

export default connect(null, { authenticate: auth })(App);
App.propTypes = { doAuth: PropTypes.func };
