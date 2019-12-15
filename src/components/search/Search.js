import React from "react";
import { connect } from "react-redux";
import { search } from "../../redux/actions";
import PropTypes from "prop-types";

import octopus from "../../images/gitHub-octopus.png";
import "./search.scss";

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    searchFunc: value => dispatch(search(value))
  };
};

const Search = ({ users, searchFunc, status, errorMessage }) => {
  const renderOctopus = (
    <div className="search__octopus">
      <img
        className="search__octopus__img"
        src={octopus}
        alt="github octopus"
      />
      <div className="search__octopus__cloud">
        <p className="search__octopus__cloud__text">Start search by typing</p>
      </div>
    </div>
  );
  return (
    <div className="search">
      <div className="search__form-wraper">
        <h1 className="search__form-wraper__headline">
          Let's search GitHub users!
        </h1>
        <input
          className="search__form-wraper__input"
          type="text"
          placeholder="User name"
          onChange={event => searchFunc(event.target.value)}
        />
      </div>
      {!users && renderOctopus}
      {status === "failure" && <p>{errorMessage}</p>}
    </div>
  );
};
Search.propTypes = {
  users: PropTypes.array,
  searchFunc: PropTypes.func,
  status: PropTypes.string,
  errorMessage: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
