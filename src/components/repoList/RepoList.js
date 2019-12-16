import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { GoChevronLeft } from "react-icons/go";

import Card from "../card/Card";

import "./repoList.scss";

const RepoList = ({ repositories, push }) => {
  if (!repositories) return <div>Loading</div>;

  const user = repositories[0] && repositories[0].owner.login;
  return (
    <div className="repo-wraper">
      <h1>List of {user} github repositories</h1>
      <button onClick={() => push("/")}>
        <GoChevronLeft color="rgb(221, 44, 74)" />
        Back
      </button>
      <div className="repo-wraper__list">
        {repositories.map(repo => (
          <Card repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => state.reducer;

export default connect(mapStateToProps, { push })(RepoList);
RepoList.propTypes = {
  repositories: PropTypes.array
};
