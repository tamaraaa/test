import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authentication } from "./redux/actions";
import Search from "./components/search/Search.js";
import UserList from "./components/userList/UserList";
import RepoList from "./components/repoList/RepoList";

import "./App.scss";

const mapDispatchToProps = dispatch => {
  return {
    doAuth: () => dispatch(authentication())
  };
};
const App = ({ doAuth }) => {
  useEffect(() => {
    doAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Search} />
        <Route path="/" exact component={UserList} />
        <Route path="/repositories" exact component={RepoList} />
      </Router>
    </div>
  );
};

App.propTypes = { doAuth: PropTypes.func };
export default connect(null, mapDispatchToProps)(App);
