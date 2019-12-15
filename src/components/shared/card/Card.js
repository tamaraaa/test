import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { generateDescription } from "../../../utils";
import { getRepos } from "../../../redux/actions";

import "./card.scss";

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    getRepos: user => dispatch(getRepos(user))
  };
};
const Card = ({ repo, user, getRepos }) => {
  console.log(repo);
  const img = user && user.avatar_url;
  const name = repo ? repo.name : user.login;
  const decription = repo ? repo.description : user.bio;
  const url = repo ? repo.html_url : "/repositories";

  const info = repo ? (
    <React.Fragment>
      <span>Created at : {repo.created_at}</span>
      <span>Forks : {repo.fork}</span>
    </React.Fragment>
  ) : (
    ""
  );

  const link = url =>
    /^https?:\/\//.test(url) ? (
      <a href={url} target="_blank">
        {" "}
        <span className="user-list__item__card__btn"> check out</span>
      </a>
    ) : (
      <Link to={url}>
        {" "}
        <span
          onClick={() => getRepos(user.login)}
          className="user-list__item__card__btn"
        >
          {" "}
          see repos
        </span>
      </Link>
    );

  return (
    <div className="user-list__item">
      <div className="user-list__item__card">
        <div className="user-list__item__card__title">{name}</div>
        {user && (
          <img className="user-list__item__card__img" src={img} alt="user" />
        )}
        <div className="user-list__item__card__info">
          {generateDescription(decription)}
        </div>
        {link(url)}
        {info}
      </div>
    </div>
  );
};
Card.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.object,
  getRepos: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
