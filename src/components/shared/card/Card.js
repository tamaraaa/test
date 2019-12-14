import React from "react";
import { connect } from "react-redux";

import { getUserInfo } from "../../../redux/actions";
import "./card.scss";

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    userInfo: value => dispatch(getUserInfo(value))
  };
};
const Card = ({ user, usersRepo }) => {
  const description = usersRepo
    ? usersRepo.description.slice(0, 300)
    : user.description;
  const img = usersRepo ? usersRepo.image : user.avatar_url;
  const name = usersRepo ? usersRepo.name : user.login;

  console.log(user.login);
  return (
    <div className="user-list__item">
      <div className="user-list__item__card">
        <div className="user-list__item__card__title">{name}</div>

        <img className="user-list__item__card__img" src={img} alt="user" />
        <div className="user-list__item__card__info">show info</div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
