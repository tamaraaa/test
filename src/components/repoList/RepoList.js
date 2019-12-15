import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "../shared/card/Card";

import "./repoList.scss";

const mapStateToProps = state => {
  return state;
};

const RepoList = ({ usersRepo, selectedUser }) => {
  return (
    <>
      <h3>list of {selectedUser} github repositories</h3>
      <div className="repo-list">
        {usersRepo &&
          usersRepo.map(repo => {
            return <Card repo={repo} key={repo.id} />;
          })}
      </div>
    </>
  );
};
RepoList.propTypes = {
  usersRepo: PropTypes.array,
  selectedUser: PropTypes.string
};
export default connect(mapStateToProps)(RepoList);
