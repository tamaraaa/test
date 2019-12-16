import React from "react";
import PropTypes from "prop-types";
import { GoRepoForked, GoStar, GoEye } from "react-icons/go";
import "./card.scss";

const generateDescription = desc =>
  !desc ? "Description is not availible" : desc.slice(0, 50);

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
    <h2>{name}</h2>
    <p>{generateDescription(description)}</p>
    <span>Created at : {created_at}</span>
    <span>
      <GoRepoForked />
      Forks : {forks_count}
    </span>
    <span>
      <GoEye />
      watcher : {watchers_count}
    </span>
    <span>
      <GoStar />
      stars : {stargazers_count}
    </span>
    <a href={html_url} target="_blank">
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