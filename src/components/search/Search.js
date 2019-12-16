import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/Card";
import { getRepos, getUsers } from "../../redux/actions";
import octopus from "../../images/gitHub-octopus.png";

import "./search.scss";

const ErrorBlock = ({ errorMessage }) => (
  <div className="error-cloud">
    <p>Sorry, something went wrong.</p>
    <p>{errorMessage}</p>
    <p>Try searching again.</p>
  </div>
);

const Search = ({
  users,
  errorMessage,
  handleSearch,
  searchedQuery,
  getRepos
}) => {
  const [value, setValue] = useState(searchedQuery || "");
  const onChange = ({ target }) => {
    const trimmedValue = target.value.trim();
    setValue(trimmedValue);
    if (trimmedValue.length > 2) handleSearch(trimmedValue);
  };

  return (
    <div className="search">
      <div className="search__form">
        <h1>Let's search GitHub users!</h1>
        <input
          type="text"
          placeholder="Type a github username..."
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="search__content">
        {errorMessage && <ErrorBlock errorMessage={errorMessage} />}
        {users ? (
          <div className="search__content__cards">
            {users.map(user => (
              <Card user={user} getRepos={getRepos} key={user.id} />
            ))}
          </div>
        ) : (
          <div className="search__content__octupus">
            <img src={octopus} alt="octopus" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.reducer.users,
  errorMessage: state.reducer.errorMessage,
  searchedQuery: state.reducer.searchedQuery
});
const mapDispatchToProps = dispatch => ({
  handleSearch: value => dispatch(getUsers(value)),
  getRepos: user => dispatch(getRepos(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
Search.propTypes = {
  users: PropTypes.array,
  errorMessage: PropTypes.string,
  handleSearch: PropTypes.func
};
