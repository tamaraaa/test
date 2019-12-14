import React from "react";
import { connect } from "react-redux";

import Card from "../shared/card/Card";

import "./userList.scss";
import { getUserInfo } from "../../redux/actions";

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    userInfo: value => dispatch(getUserInfo(value))
  };
};
const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users &&
        users.map(user => {
          return <Card user={user} key={user.id} />;
        })}
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
