import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import { history } from "./redux/store";
import { pending } from "./constants";
import { route } from "./routes";
import Loader from "./components/loader/Loader";
import Header from "./components/header/Header";
import Search from "./components/search/Search.js";
import RepoList from "./components/repoList/RepoList";

import "./App.scss";

const App = ({ status }) => {
  return (
    <div>
      <Header />
      {status === pending && <Loader />}
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={route.landingPage} exact component={Search} />
          <Route path={route.repositories} exact component={RepoList} />
        </Switch>
        <Redirect to={route.landingPage} />
      </ConnectedRouter>
    </div>
  );
};

const mapStateToProps = state => ({ status: state.reducer.status });
App.propTypes = {
  status: PropTypes.string
};
export default connect(mapStateToProps)(App);
