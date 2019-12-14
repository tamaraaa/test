import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Search from "./components/search/Search.js";
import UserList from "./components/userList/UserList";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Search} />
        <Route path="/" exact component={UserList} />
      </Router>
    </div>
  );
};
export default App;
