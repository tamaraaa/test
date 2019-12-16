import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "../card/Card";

import "./userList.scss";

const mapStateToProps = state => {
  return state;
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
UserList.propTypes = {
  users: PropTypes.array
};
export default connect(mapStateToProps)(UserList);
