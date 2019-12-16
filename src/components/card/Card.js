import React from "react";
import PropTypes from "prop-types";
import { GoRepoForked, GoStar, GoEye } from "react-icons/go";

import { generateDescription, formatDate } from "./utils";

import "./card.scss";

const UserCard = ({ user: { login, avatar_url, bio }, getRepos }) => (
  <>
    <img src={avatar_url} alt="user" />
    <h2>{login}</h2>
    <p>{generateDescription(bio)}</p>
    <button onClick={() => getRepos(login)}>
      <span>See repositories</span>
    </button>
  </>
);

const RepoCard = ({
  repo: {
    name,
    description,
    created_at,
    forks_count,
    watchers_count,
    stargazers_count,
    html_url
  }
}) => (
  <>
    <h3>{name}</h3>
    <div className="description">
      <p>
        <strong>Description:</strong>
      </p>
      <p>{generateDescription(description)}</p>
    </div>
    <div className="info">
      <span>
        <strong>Created at : </strong>
        {formatDate(created_at)}
      </span>
      <span>
        <GoRepoForked />
        <strong>Forks : </strong>
        {forks_count}
      </span>
      <span>
        <GoEye />
        <strong> Watchers : </strong>
        {watchers_count}
      </span>
      <span>
        <GoStar />
        <strong>Stars : </strong>
        {stargazers_count}
      </span>
    </div>
    <a href={html_url} target="_blank" rel="noopener noreferrer">
      <span>Go to repository</span>
    </a>
  </>
);

const Card = ({ repo, user, getRepos }) => {
  const renderCard = () =>
    user ? (
      <UserCard user={user} getRepos={getRepos} />
    ) : (
      <RepoCard repo={repo} />
    );

  return <div className="card">{renderCard()}</div>;
};

export default Card;

Card.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.object,
  getRepos: PropTypes.func
};
