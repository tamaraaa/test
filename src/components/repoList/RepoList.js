import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { GoChevronLeft } from "react-icons/go";

import Card from "../card/Card";

import "./repoList.scss";

const RepoList = ({ repositories, push }) => {
  const arrowColor = "rgb(221, 44, 74)";
  const user = repositories && repositories[0] && repositories[0].owner.login;
  return (
    <div className="repo-wraper">
      <h1>List of {user} github repositories</h1>
      <button onClick={() => push("/")}>
        <GoChevronLeft color={arrowColor} />
        Back
      </button>
      <div className="repo-wraper__list">
        {repositories &&
          repositories.map(repo => <Card repo={repo} key={repo.id} />)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  repositories: state.reducer.repositories
});

export default connect(mapStateToProps, { push })(RepoList);
RepoList.propTypes = {
  repositories: PropTypes.array,
  push: PropTypes.func
};
